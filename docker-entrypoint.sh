#!/bin/sh
set -eu

: "${GO_API_URL:?GO_API_URL is required}"
: "${NODE_API_URL:?NODE_API_URL is required}"
: "${PORT:=8080}"

envsubst '${GO_API_URL} ${NODE_API_URL}' \
  < ./config.template.js \
  > ./public/config.js

exec node server.js
