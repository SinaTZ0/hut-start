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
exec "$bin" "$@"
