#!/usr/bin/env bash
set -e
set -x

cwd=`pwd`
package="$1"
rm -rf "$package/node_modules"
rm -f "$package/material.css.js"
cd "$package" && npm install && cd "$cwd"
scripts/build-css.sh "$package"

npmname=`node -e "console.log(require(\"${cwd}/${package}/package.json\").name)"`
if [ ! -L ${cwd}/node_modules/${npmname} ]; then
  source_dir="${cwd}/${package}"
  destination_link="${cwd}/node_modules/${npmname}"
  ln -sfv "$source_dir" "$destination_link"
fi
