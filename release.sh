#!/bin/bash
set -e

MSG="${1:-GEO updated}"

echo "== 1. Build =="
npm run build

echo ""
echo "== 2. Check the build before committing =="
STALE=$(grep -o "responsive, high-performance websites" dist/services/index.html | wc -l | tr -d ' ')
echo "Stale markers in dist/services/index.html: $STALE"
if [ "$STALE" != "0" ]; then
  echo "The build still contains the stale block. Stopping."
  exit 1
fi

echo ""
echo "== 3. Stage and check =="
git add .
git status --short
if git status --short | grep -qE '(^|/)\.env'; then
  echo "A .env file is staged. Stopping. Run: git restore --staged .env"
  exit 1
fi

echo ""
echo "== 4. Commit and push =="
git commit -m "$MSG"
git push

echo ""
echo "Now run the server steps on Namecheap:"
echo "  cd ~/repos/dthweb"
echo "  git pull origin main"
echo "  cp -r dist/. ~/discoverytechhub.com/"
