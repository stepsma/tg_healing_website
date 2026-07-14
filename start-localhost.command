#!/bin/zsh
cd "$(dirname "$0")"
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
npm run dev -- --host 127.0.0.1 --port 5173
