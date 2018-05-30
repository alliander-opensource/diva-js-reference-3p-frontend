#!/bin/sh
if [ -n "$1" ] && [ -n "$2" ]
then
  echo "Adding env vars to template $1"
  perl -pe 's;(\\*)(\$([a-zA-Z_][a-zA-Z_0-9]*)|\$\{([a-zA-Z_][a-zA-Z_0-9]*)\})?;substr($1,0,int(length($1)/2)).($2&&length($1)%2?$2:$ENV{$3||$4});eg' $1 > $2
else
  echo "Usage: envtemplate <template> <destination>"
fi
