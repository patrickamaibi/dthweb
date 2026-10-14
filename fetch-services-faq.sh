#!/bin/bash

URL="https://discoverytechhub.com/services"

OUT=$(curl -sL -A "Mozilla/5.0" "$URL" | perl -0777 -e '
my $h = <STDIN>;
$h =~ s/<[^>]+>/ /g;
$h =~ s/\s+/ /g;
for my $q (@ARGV) {
  print "----- $q -----\n";
  my $n = 0;
  while ($h =~ /\Q$q\E(.{0,700})/g) {
    $n++;
    print "[match $n] $1\n\n";
    last if $n >= 3;
  }
  print "(no match)\n\n" if !$n;
}
' -- \
  "How long does a project take" \
  "Do you offer support after the project" \
  "Can you work with clients outside Abuja" \
  "Can I combine services in one package")

printf "%s" "$OUT" | pbcopy
echo "Copied. Characters: $(printf "%s" "$OUT" | wc -c)"
