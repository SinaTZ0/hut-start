package commands

import (
	"fmt"
	"os"
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
	df.Stdout, df.Stderr = os.Stdout, os.Stderr
	_ = df.Run()
	system := stack.Docker(nil, "system", "df")
	system.Stdout, system.Stderr = os.Stdout, os.Stderr
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
	cmd.Stderr = os.Stderr
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

/*===== Load Departments =====*/

// Departments loads the departments' pages from the seed bundled into the app's image (`src/db/seed-departments.ts`).
// A department that exists is skipped, so editors' changes stay; --replace loads it again, and slugs limit the run.
// The photos are uploaded as an admin, by email: --as, or asked on a terminal.
func (t *Tool) Departments(args []string) error {
	if err := t.requireSetUp(); err != nil {
		return err
	}
	email, seedArgs := "", []string{}
	for i := 0; i < len(args); i++ {
		switch arg := args[i]; {
		case arg == "--as":
			if i+1 >= len(args) {
				return ui.Usage("--as needs an admin's email.")
			}
			i++
			email = args[i]
		case arg == "--replace" || !strings.HasPrefix(arg, "-"):
			seedArgs = append(seedArgs, arg)
		default:
			return ui.Usage("departments doesn't know %s (see deploy/deploy.sh help)", arg)
		}
	}
	if email == "" {
		if !ui.Interactive {
			return ui.Usage("departments needs --as <email> without a terminal.")
		}
		var err error
		if email, err = ui.Ask("Email of an admin (the photos' uploader)", "", "the email"); err != nil {
			return err
		}
	}
	if !strings.Contains(email, "@") {
		return ui.Fail("%q isn't an email address.", email)
	}
	// A one-off container of the running app's service: its image, settings and networks (database, storage). The
	// email goes in as a variable, never as part of a command line the shell reads.
	run := append([]string{"run", "--rm", "--no-deps", "-T", "-e", "SEED_ADMIN_EMAIL=" + email, "app",
		"node", "deploy/seed-departments.mjs"}, seedArgs...)
	if err := t.S.Run(run...); err != nil {
		return interrupt.Check(ui.Fail("Loading the departments failed (see above)."))
	}
	ui.OK("Departments loaded.")
	return nil
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
