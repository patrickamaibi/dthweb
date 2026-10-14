#!/bin/bash

URLS=(
  "https://discoverytechhub.com/"
  "https://discoverytechhub.com/services"
)

OUT=""
for url in "${URLS[@]}"; do
  HTML=$(curl -sL -A "Mozilla/5.0" "$url")
  BLOCKS=$(printf "%s" "$HTML" | perl -0777 -ne 'while (/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/gs) { print "$1\n\n" }')
  COUNT=$(printf "%s" "$HTML" | perl -0777 -ne 'my $n = () = /application\/ld\+json/g; print $n')
  TYPES=$(printf "%s" "$BLOCKS" | grep -o '"@type":"[^"]*"' | sort | uniq -c)
  OUT+="===== $url ====="$'\n'"JSON-LD blocks: $COUNT"$'\n'"Types found:"$'\n'"$TYPES"$'\n\n'"$BLOCKS"$'\n\n'
done

printf "%s" "$OUT" | pbcopy
echo "$OUT" | grep -E '=====|JSON-LD blocks|@type'
echo "Copied. Characters: $(pbpaste | wc -c)"
