#!/bin/sh
set -eu

: "${GO_API_URL:=http://localhost:3000}"
: "${NODE_API_URL:=http://localhost:3001}"
: "${PORT:=8080}"

envsubst '${GO_API_URL} ${NODE_API_URL}' \
  < /etc/nginx/templates/config.template.js \
  > /usr/share/nginx/html/config.js

envsubst '${PORT}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
