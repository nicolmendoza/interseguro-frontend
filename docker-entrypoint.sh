#!/bin/sh
set -eu

: "${GO_API_URL:=http://localhost:3000}"
: "${NODE_API_URL:=http://localhost:3001}"

envsubst '${GO_API_URL} ${NODE_API_URL}' \
  < /etc/nginx/templates/config.template.js \
  > /usr/share/nginx/html/config.js

exec nginx -g 'daemon off;'
