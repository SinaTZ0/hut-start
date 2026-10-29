package commands

import (
	"fmt"
	"os/exec"
	"slices"
	"strings"
	"time"

	"deploy/internal/backup"
	"deploy/internal/interrupt"
	"deploy/internal/pgweb"
	"deploy/internal/stack"
	"deploy/internal/status"
	"deploy/internal/ui"
)

/*===== Status =====*/

// Status shows the containers, disk, Docker's disk use, the backups and the status lines.
func (t *Tool) Status(args []string) error {
	if err := noArgs("status", args); err != nil {
		return err
	}
	if err := t.requireSetUp(); err != nil {
		return err
	}
	ui.Step("Containers")
	_ = t.S.Run("ps", "-a", "--format", "table {{.Service}}\t{{.State}}\t{{.Status}}")
	ui.Step("Disk")
	df := exec.Command("df", "-h", t.P.Root)
	df.Stdout, df.Stderr = ui.Out, ui.Err
	_ = df.Run()
	system := stack.Docker(nil, "system", "df")
	system.Stdout, system.Stderr = ui.Out, ui.Err
	_ = system.Run()
	ui.Step("Backups")
	dir := backup.Dir(t.P)
	ui.Info("%s: %d files, %s", dir, len(backup.List(dir)), backup.Size(backup.DirSize(dir)))
	ui.Step("Status")
	for _, line := range status.Lines(t.P, t.S, t.Env) {
		ui.Info("  %s", line)
	}
	return nil
}

/*===== Logs =====*/

// Logs follows a service's last 200 log lines until Ctrl-C.
func (t *Tool) Logs(args []string) error {
	if err := t.requireSetUp(); err != nil {
		return err
	}
	if len(args) > 1 {
		return ui.Usage("logs takes one service (see deploy/deploy.sh help)")
	}
	service := ""
	if len(args) == 1 {
		service = args[0]
	} else {
		n, err := ui.Choose("Which service?", stack.Services)
		if err != nil {
			return err
		}
		service = stack.Services[n]
	}
	if !slices.Contains(stack.Services, service) {
		return ui.Fail("No service %q: one of %s.", service, join(stack.Services))
	}
	ui.Info("%s", ui.Dim(fmt.Sprintf("Following %s; Ctrl-C to stop.", service)))
	_ = t.S.Run("logs", "-f", "--tail", "200", service)
	return interrupt.Check(nil)
}

/*===== Make Admin =====*/

// Admin gives an account the admin role.
func (t *Tool) Admin(args []string) error {
	if err := t.requireSetUp(); err != nil {
		return err
	}
	if len(args) > 1 {
		return ui.Usage("admin takes one email (see deploy/deploy.sh help)")
	}
	email := ""
	if len(args) == 1 {
		email = args[0]
	} else {
		var err error
		if email, err = ui.Ask("Email of the account", "", "the email"); err != nil {
			return err
		}
	}
	if !strings.Contains(email, "@") {
		return ui.Fail("%q isn't an email address.", email)
	}
	// The email goes in as a psql variable (`:'email'` quotes it), never pasted into the SQL.
	cmd := t.S.Command(nil, "exec", "-T", "db", "psql", "-U", "app", "-d", "app", "-v", "ON_ERROR_STOP=1",
		"-v", "email="+email, "-qtA")
	cmd.Stdin = strings.NewReader(`update "user" set role = 'admin' where email = :'email' returning email;`)
	cmd.Stderr = ui.Err
	out, err := cmd.Output()
	if err != nil {
		return interrupt.Check(ui.Fail("psql failed (see above)."))
	}
	if strings.TrimSpace(string(out)) == "" {
		return ui.Fail("No account with %s. Sign up on the site first.", email)
	}
	ui.OK("%s is now an admin.", email)
	return nil
}

/*===== Seed =====*/

// Seed loads a server's content: the departments, the offices' pages with the forms and the phone book, and the news
// archive. Each part takes its own options after its name; `all` runs the three in that order, the long archive last.
// Without a part, on a terminal, it asks which.
func (t *Tool) Seed(args []string) error {
	if err := t.requireSetUp(); err != nil {
		return err
	}
	if len(args) == 0 {
		if !ui.Interactive {
			return ui.Usage("seed needs a part: departments, pages, archive or all (see deploy/deploy.sh help)")
		}
		return t.seedMenu()
	}
	switch part, rest := args[0], args[1:]; part {
	case "departments":
		return t.seedDepartments(rest)
	case "pages":
		return t.seedPages(rest)
	case "archive":
		return t.seedArchive(rest)
	case "all":
		if err := noArgs("seed all", rest); err != nil {
			return err
		}
		return t.seedAll()
	default:
		return ui.Usage("Unknown seed part: %s (departments, pages, archive or all)", part)
	}
}

func (t *Tool) seedMenu() error {
	n, err := ui.Choose("Seed what?", []string{
		"All             departments, pages, then the news archive",
		"Departments     add the departments' pages that are missing",
		"Pages           add the offices, forms and phone book if missing",
		"News archive    read the old site's news and notices (long the first time)",
		"Back",
	})
	if err != nil {
		return err
	}
	switch n {
	case 0:
		return t.seedAll()
	case 1:
		return t.seedDepartments(nil)
	case 2:
		return t.seedPages(nil)
	case 3:
		return t.seedArchive(nil)
	}
	return nil
}

// seedAll stops at the first part that fails. Every part skips what's loaded, so running it again carries on.
func (t *Tool) seedAll() error {
	for _, seed := range []func([]string) error{t.seedDepartments, t.seedPages, t.seedArchive} {
		if err := seed(nil); err != nil {
			return err
		}
	}
	return nil
}

/*------ Departments ------*/

// seedDepartments loads the departments' pages from the seed bundled into the app's image
// (`src/db/seed-departments.ts`). A department that exists is skipped, so editors' changes stay; --replace loads it
// again, and slugs limit the run.
func (t *Tool) seedDepartments(args []string) error {
	for _, arg := range args {
		if arg != "--replace" && strings.HasPrefix(arg, "-") {
			return ui.Usage("seed departments doesn't know %s (see deploy/deploy.sh help)", arg)
		}
	}
	// A one-off container of the running app's service: its image, settings and networks (database, storage).
	run := append([]string{"run", "--rm", "--no-deps", "-T", "app", "node", "deploy/seed-departments.mjs"}, args...)
	if err := t.S.Run(run...); err != nil {
		return interrupt.Check(ui.Fail("Loading the departments failed (see above)."))
	}
	ui.OK("Departments loaded.")
	return nil
}

/*------ Pages ------*/

// pageParts are the parts of `src/db/seed-pages.ts`, which a run can be limited to.
var pageParts = map[string]bool{"offices": true, "library": true, "phonebook": true}

// seedPages loads the offices' pages, the forms library and the phone book from the seed bundled into the app's image
// (`src/db/seed-pages.ts`). A part that has rows is skipped, so editors' changes stay; --replace loads it again, and
// part names limit the run.
func (t *Tool) seedPages(args []string) error {
	for _, arg := range args {
		if arg != "--replace" && !pageParts[arg] {
			return ui.Usage("seed pages doesn't know %s (see deploy/deploy.sh help)", arg)
		}
	}
	run := append([]string{"run", "--rm", "--no-deps", "-T", "app", "node", "deploy/seed-pages.mjs"}, args...)
	if err := t.S.Run(run...); err != nil {
		return interrupt.Check(ui.Fail("Loading the pages failed (see above)."))
	}
	ui.OK("Pages loaded.")
	return nil
}

/*------ News Archive ------*/

// seedArchive reads the old site's news, notices and courses listings into the news archive, then every article page
// not read yet (`src/db/sync-feed-archive.ts`): about 2,400 on a new server, an hour or more. Stopping it midway is
// safe; the app's timer reads the rest a few at a time. --listings-only skips the article pages, --pages <n> reads
// only the first n pages of each listing, --articles <n> at most n article pages.
func (t *Tool) seedArchive(args []string) error {
	for i := 0; i < len(args); i++ {
		switch args[i] {
		case "--listings-only":
		case "--pages", "--articles":
			if i+1 >= len(args) || !isWholeNumber(args[i+1]) {
				return ui.Usage("%s needs a whole number (see deploy/deploy.sh help)", args[i])
			}
			i++
		default:
			return ui.Usage("seed archive doesn't know %s (see deploy/deploy.sh help)", args[i])
		}
	}
	run := append([]string{"run", "--rm", "--no-deps", "-T", "app", "node", "deploy/sync-feed-archive.mjs"}, args...)
	if err := t.S.Run(run...); err != nil {
		return interrupt.Check(ui.Fail("Filling the archive failed (see above). Run it again to carry on."))
	}
	ui.OK("Archive filled.")
	return nil
}

// isWholeNumber reports whether value is digits only.
func isWholeNumber(value string) bool {
	if value == "" {
		return false
	}
	for _, r := range value {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}

/*===== Database Browser =====*/

// Pgweb opens, closes or reports on the database browser. Without a subcommand, on a terminal, it offers what fits:
// closing an open one, or opening one for 1, 4 or 24 hours.
func (t *Tool) Pgweb(args []string) error {
	if err := t.requireSetUp(); err != nil {
		return err
	}
	if len(args) == 0 {
		if !ui.Interactive {
			pgweb.Status(t.S)
			return nil
		}
		return t.pgwebMenu()
	}
	switch sub, rest := args[0], args[1:]; sub {
	case "open":
		d, dump := pgweb.Max, true
		for i := 0; i < len(rest); i++ {
			switch rest[i] {
			case "--for":
				if i+1 >= len(rest) {
					return ui.Usage("--for needs a time, like 30m, 4h or 24h.")
				}
				i++
				var err error
				if d, err = pgweb.ParseDuration(rest[i]); err != nil {
					return ui.Usage("%s", err.Error())
				}
			case "--no-backup":
				dump = false
			default:
				return ui.Usage("Unknown pgweb open option: %s (see deploy/deploy.sh help)", rest[i])
			}
		}
		if err := stack.RequireTools(); err != nil {
			return err
		}
		return pgweb.Open(t.P, t.S, d, dump)
	case "close":
		if err := noArgs("pgweb close", rest); err != nil {
			return err
		}
		return pgweb.Close(t.S)
	case "status":
		if err := noArgs("pgweb status", rest); err != nil {
			return err
		}
		pgweb.Status(t.S)
		return nil
	default:
		return ui.Usage("Unknown pgweb command: %s (open, close or status)", sub)
	}
}

func (t *Tool) pgwebMenu() error {
	if b := pgweb.Find(t.S); b != nil && !b.Overdue() {
		pgweb.Status(t.S)
		n, err := ui.Choose("Database browser:", []string{"Close it now", "Open a new one (a new sign-in)", "Back"})
		if err != nil || n == 2 {
			return err
		}
		if n == 0 {
			return pgweb.Close(t.S)
		}
	}
	ui.Info("A database browser with full read and write access, through an SSH tunnel. It closes itself on time.")
	hours := []time.Duration{time.Hour, 4 * time.Hour, 24 * time.Hour}
	n, err := ui.Choose("Open it for how long?", []string{"1 hour", "4 hours", "24 hours"})
	if err != nil {
		return err
	}
	return pgweb.Open(t.P, t.S, hours[n], true)
}
