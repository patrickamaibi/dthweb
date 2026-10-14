#!/bin/bash

set -a
source ./.env
set +a

URL="$VITE_SUPABASE_URL"
KEY="$VITE_SUPABASE_ANON_KEY"

echo "== How the code uses the testimonials table =="
grep -rnE "from\(['\"]testimonials['\"]\)" src | cut -c1-200
echo ""

BODY=$(curl -s "$URL/rest/v1/testimonials?select=*&limit=1000" \
  -H "apikey: $KEY" -H "Authorization: Bearer $KEY")

printf "%s" "$BODY" | perl -MJSON::PP -e '
my $raw = do { local $/; <STDIN> };
my $rows = eval { decode_json($raw) };
if (!$rows || ref($rows) ne "ARRAY") { print "Could not parse the response.\n"; exit; }

print "== Rows visible to an anonymous visitor ==\n";
print scalar(@$rows), " rows\n\n";
exit if !@$rows;

my @cols = sort keys %{ $rows->[0] };
print "== Columns visible ==\n", join(", ", @cols), "\n\n";

my @private = grep { /email|phone|whatsapp|mobile|address|ip|token|password|secret|user_id/i } @cols;
print "== Columns that look private (names only) ==\n";
print @private ? join(", ", @private) . "\n\n" : "none\n\n";

my @status = grep { /status|approved|published|visible|verified|featured|moderat|state/i } @cols;
print "== Value counts for status-type columns ==\n";
if (!@status) { print "none found\n"; }
for my $c (@status) {
  my %n;
  for my $r (@$rows) {
    my $v = defined $r->{$c} ? (ref($r->{$c}) ? "complex" : $r->{$c}) : "null";
    $n{$v}++;
  }
  print "$c: ", join(", ", map { "$_ = $n{$_}" } sort keys %n), "\n";
}
'
