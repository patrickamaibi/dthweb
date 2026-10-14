#!/bin/bash

BASE="https://discoverytechhub.com"
OUT=""

OUT+="== Files (status and content type) =="$'\n'
for p in /llms.txt /robots.txt /sitemap.xml /logo.png /og.png; do
  RES=$(curl -sL -A "Mozilla/5.0" -o /dev/null -w "%{http_code} %{content_type}" "$BASE$p")
  OUT+="$p -> $RES"$'\n'
done

OUT+=$'\n'"== Schema types per page =="$'\n'
for p in / /services /hub /about /quote /testimonials; do
  HTML=$(curl -sL -A "Mozilla/5.0" "$BASE$p")
  BLOCKS=$(printf "%s" "$HTML" | perl -0777 -ne 'while (/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/gs) { print "$1\n" }')
  TYPES=$(printf "%s" "$BLOCKS" | grep -o '"@type": *"[^"]*"' | sed 's/"@type": *//; s/"//g' | sort -u | tr '\n' ' ')
  OUT+="$p -> ${TYPES:-none}"$'\n'
done

OUT+=$'\n'"== Email obfuscation on home page =="$'\n'
N=$(curl -sL -A "Mozilla/5.0" "$BASE/" | grep -o "email-protection" | wc -l | tr -d ' ')
OUT+="Obfuscated email links: $N"$'\n'

printf "%s" "$OUT" | pbcopy
printf "%s" "$OUT"
