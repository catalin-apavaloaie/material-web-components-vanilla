#!/usr/bin/env bash
set -e
set -x

cwd=`pwd`

mkdir -p "$cwd/node_modules/@dolphin-kiss"
for package in `find packages -d 1 -type d`; do
  scripts/bootstrap-package.sh "$package"
done