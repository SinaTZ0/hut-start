// Package menu is what the tool shows with no command: a header with the domain, the status lines, and the actions
// that fit the server (Set up before setup, everything else after). An action that fails or is stopped with Ctrl-C
// comes back to the menu instead of ending the tool.
package menu

import (
	"errors"
	"fmt"

	"charm.land/huh/v2"

	"deploy/internal/commands"
	"deploy/internal/envfile"
	"deploy/internal/interrupt"
	"deploy/internal/status"
	"deploy/internal/ui"
)

type item struct {
	key, label, hint string
	run              func(t *commands.Tool) error
}

var items = []item{
	{"setup", "Set up", "clone, create .env, first build", func(t *commands.Tool) error { return t.Setup(nil) }},
	{"update", "Update", "back up, pull, rebuild, swap in the new app", func(t *commands.Tool) error { return t.Update(nil) }},
	{"rollback", "Roll back", "run an earlier version of the app", func(t *commands.Tool) error { return t.Rollback(nil) }},
	{"env", "Settings", "check, edit .env, apply", func(t *commands.Tool) error { return t.Settings(nil) }},
	{"backup", "Back up", "database and/or media", func(t *commands.Tool) error { return t.Backup(nil) }},
	{"restore", "Restore", "from a backup file", func(t *commands.Tool) error { return t.Restore(nil) }},
	{"cert", "SSL certificate", "automatic or your own files", func(t *commands.Tool) error { return t.Cert(nil) }},
	{"status", "Status", "containers, health, disk", func(t *commands.Tool) error { return t.Status(nil) }},
	{"logs", "Logs", "pick a service, follow", func(t *commands.Tool) error { return t.Logs(nil) }},
	{"admin", "Make admin", "promote an account by email", func(t *commands.Tool) error { return t.Admin(nil) }},
	{"departments", "Load departments", "add the departments' pages that are missing", func(t *commands.Tool) error {
		return t.Departments(nil)
	}},
	{"pgweb", "Database browser", "browse and edit the database, for a set time", func(t *commands.Tool) error {
		return t.Pgweb(nil)
	}},
}

// available: Set up is for a new server only; everything else needs it done.
func available(t *commands.Tool, it item) bool {
	if it.key == "setup" {
		return !t.P.IsSetUp()
	}
	return t.P.IsSetUp()
}

// Run shows the menu until Quit.
func Run(t *commands.Tool) error {
	if !ui.Interactive {
		return ui.Fail("No terminal for the menu: pass a command (deploy/deploy.sh help).")
	}
	for {
		interrupt.Reset()
		it, quit := pick(t)
		if quit {
			return nil
		}
		if it == nil {
			continue
		}
		if !available(t, *it) {
			if it.key == "setup" {
				ui.Warn("Not available: this server is already set up.")
			} else {
				ui.Warn("Not available: set up first.")
			}
			ui.Pause()
			continue
		}
		// Without a checkout, Set up clones and hands over to the clone's own tool, which replaces this one.
		if it.key == "setup" && !t.P.IsCheckout() {
			return it.run(t)
		}

		err := it.run(t)
		switch {
		case errors.Is(err, interrupt.ErrInterrupted):
			fmt.Fprintln(ui.Err)
		case err != nil:
			ui.PrintError(err)
		}
		ui.Pause()
		if it.key == "update" && err == nil {
			return t.Restart()
		}
	}
}

// pick draws the menu and returns the chosen action, or quit. A nil item with quit unset means draw it again.
func pick(t *commands.Tool) (*item, bool) {
	ui.Clear()
	fmt.Fprintf(ui.Out, "%s  %s\n\n", ui.Bold("Deploy"), envfile.Get(t.P.EnvFile(), "DOMAIN"))
	lines := status.Lines(t.P, t.S, t.Env)

	if ui.TUI {
		// The status first, boxed, and the actions in an arrow-key list under it. Only the available ones are listed.
		fmt.Fprintln(ui.Out, ui.Box(lines))
		fmt.Fprintln(ui.Out)
		var options []huh.Option[int]
		choice := -1
		for i, it := range items {
			if available(t, it) {
				options = append(options, huh.NewOption(fmt.Sprintf("%-17s %s", it.label, ui.Dim(it.hint)), i))
				// The list starts on the first action, not on the Quit that an unset choice would match.
				if choice < 0 {
					choice = i
				}
			}
		}
		options = append(options, huh.NewOption("Quit", -1))
		field := huh.NewSelect[int]().Options(options...).Value(&choice).Height(len(options) + 1)
		// Esc and Ctrl-C quit too.
		if err := ui.RunField(field); err != nil || choice < 0 {
			return nil, true
		}
		return &items[choice], false
	}

	rule := ui.Dim("─────────────────────────────────────────────────────")
	for i, it := range items {
		switch {
		case available(t, it):
			fmt.Fprintf(ui.Out, " %2d) %-17s %s\n", i+1, it.label, ui.Dim(it.hint))
		case it.key == "setup":
			fmt.Fprintln(ui.Out, ui.Dim(fmt.Sprintf(" %2d) %-17s (already set up)", i+1, it.label)))
		default:
			fmt.Fprintln(ui.Out, ui.Dim(fmt.Sprintf(" %2d) %-17s (set up first)", i+1, it.label)))
		}
	}
	fmt.Fprintf(ui.Out, "  0) Quit\n\n  %s\n", rule)
	for _, line := range lines {
		fmt.Fprintf(ui.Out, "  %s\n", line)
	}
	fmt.Fprintf(ui.Out, "  %s\n\n", rule)

	choice, err := ui.ReadLine("Choose: ")
	if err != nil {
		return nil, true
	}
	switch choice {
	case "0", "q", "Q":
		return nil, true
	}
	var n int
	if _, err := fmt.Sscan(choice, &n); err != nil || n < 1 || n > len(items) {
		return nil, false
	}
	return &items[n-1], false
}
