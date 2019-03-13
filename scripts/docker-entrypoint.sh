#!/usr/bin/env bash
set -x
set -e

exec dumb-init npx polyserve -H 0.0.0.0 "$@"
