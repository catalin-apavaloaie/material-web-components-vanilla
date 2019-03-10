#!/usr/bin/env bash
set -e
set -x

cwd=`pwd`

for package in `find packages -d 1 -type d`; do
  echo "$package"
  rm -rf "$package/node_modules"
  rm -f "$package/material.css.js"
  cd "$package" && npm install && cd "$cwd"
  scripts/build-css.sh "$package"
done