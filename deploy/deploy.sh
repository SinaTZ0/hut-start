#!/usr/bin/env bash
# Runs the deploy tool (docs/deployment.md → The Deploy Tool): the binary for this machine's architecture, built from
# tools/deploy/ and committed in deploy/bin/. A script, so cron lines and habits stay `deploy/deploy.sh <command>`.
set -euo pipefail

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
case $(uname -m) in
  x86_64 | amd64) arch=amd64 ;;
  aarch64 | arm64) arch=arm64 ;;
  *) arch=$(uname -m) ;;
esac
bin="$dir/bin/linux-$arch/deploy"

if [[ ! -x $bin ]]; then
  if [[ -d $dir/bin ]]; then
    echo "✗ There's no deploy tool for linux-$arch in deploy/bin/. Build it where Go is installed, commit it, then pull:" >&2
    echo "    pnpm deploy:build --arch $arch" >&2
  else
    echo "✗ The deploy tool comes with the repository. Clone it, then run it from there:" >&2
    echo "    git clone <repository> app && app/deploy/deploy.sh" >&2
  fi
  exit 1
fi

# ===== The tmux Window =====
# Closing the SSH connection ends whatever runs on its terminal, a deploy halfway included. So the menu runs in a tmux
# window that outlives the connection: a shell that starts the menu and stays when it exits, output and all, until
# `exit`. Running this script again reattaches to it. A command (`deploy/deploy.sh status`) runs here as before, so
# cron and scripts get its exit code and a second look while a deploy runs in the window is still possible; so does
# the menu without a terminal, and inside tmux already (the window's own).
if (( $# == 0 )) && [[ -z ${TMUX:-} && -t 0 && -t 1 ]]; then
  if command -v tmux >/dev/null; then
    # One window per checkout. tmux doesn't allow "." or ":" in a name.
    root_name=$(basename "$(dirname "$dir")")
    session="deploy-${root_name//[.:]/_}"
    if tmux has-session -t "=$session" 2>/dev/null; then
      exec tmux attach-session -t "=$session"
    fi
    # A tmux server that's already running gives a new window its own environment, not this one's.
    pass=()
    for name in NO_COLOR NO_GUM NO_TUI DEPLOY_ROOT SUDO_USER USER; do
      if [[ -n ${!name:-} ]]; then pass+=(-e "$name=${!name}"); fi
    done
    printf -v command '%q' "$dir/deploy.sh"
    exec tmux new-session -s "$session" -c "$(dirname "$dir")" ${pass[@]+"${pass[@]}"} \
      "bash $command; exec \"\${SHELL:-bash}\"" \
      \; set-option status-left-length 20 \
      \; set-option status-left " Deploy " \
      \; set-option status-right-length 80 \
      \; set-option status-right " Ctrl-b d: leave it running · exit: close "
  fi
  echo "tmux isn't installed, so closing this connection stops the menu. Install it (sudo apt install tmux) to keep" \
    "a deploy running when the connection drops." >&2
fi
exec "$bin" "$@"
