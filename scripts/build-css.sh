#!/usr/bin/env bash

package_location="$1"
if [ "$package_location" == "" ]; then
  echo "First argument needs to be location of package";
fi

output_file="$package_location/material.css.js"
echo "Building $output_file"

echo "import {css} from 'lit-element';" > "$output_file"
echo "const materialCss = css \`" >> "$output_file"

while read css_file; do
  if [ "$css_file" != "" ]; then
    echo "+ adding: $css_file";
    echo "/* Content from $css_file */" >> "$output_file"
    echo "" >> "$output_file"
    cat "$package_location/node_modules/$css_file" >> "$output_file"
    # cat "$package_location/node_modules/$css_file" | egrep -v '\/\*.*sourceMappingURL' >> "$output_file"
    echo "" >> "$output_file"
    echo "" >> "$output_file"
  fi
done < "$package_location/material-css-files.txt"

echo "\`" >> "$output_file"
echo "export {materialCss};" >> "$output_file"

echo "Done building $output_file"