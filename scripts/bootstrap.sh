#!/usr/bin/env bash
set -e
set -x

cwd=`pwd`

for package in `find packages -d 1 -type d`; do
  echo "$package"
  rm -rf "$package/node_modules"
  rm -f "$package/material.css.js"
  scripts/build-css.sh "$package"
done