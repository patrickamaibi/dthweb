#!/bin/bash

URL="https://discoverytechhub.com/services"
HTML=$(curl -sL -A "Mozilla/5.0" "$URL")

echo "== Stale-block markers (should both be 0) =="
echo "Old Web Design description: $(printf "%s" "$HTML" | grep -o "responsive, high-performance websites" | wc -l | tr -d ' ')"
echo "Old Printing Services entry: $(printf "%s" "$HTML" | grep -o '"name":"Printing Services"' | wc -l | tr -d ' ')"

echo ""
echo "== Where 'Proposal' appears (60 characters either side) =="
printf "%s" "$HTML" | perl -0777 -ne 'while (/(.{0,60}Proposal.{0,60})/g) { print "-> $1\n" }'

echo ""
echo "== Cache headers =="
curl -sIL -A "Mozilla/5.0" "$URL" | grep -iE "^(cf-cache-status|age|last-modified|etag|date):"
