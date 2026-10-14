#!/bin/bash

URLS=(
  "https://discoverytechhub.com/"
  "https://discoverytechhub.com/services"
)

OUT=""
for url in "${URLS[@]}"; do
  TEXT=$(curl -sL -A "Mozilla/5.0" "$url" | textutil -stdin -format html -convert txt -stdout)
  OUT+="===== $url ====="$'\n'"$TEXT"$'\n\n'
done

printf "%s" "$OUT" | pbcopy
echo "Copied text from ${#URLS[@]} pages to the clipboard."
