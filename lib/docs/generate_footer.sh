#!/bin/sh
script_dir=$(dirname "$0")

echo ©$(date +'%Y') $(cat package.json | grep \\\"author\\\" | head -1 | awk -F: '{ print $2 }' | sed 's/[\\\",]//g') >"$script_dir/../../wiki/_Footer.md"
