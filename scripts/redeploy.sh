#!/bin/bash

set -eu
set -o pipefail

. $(dirname "$0")/env.sh

${SCRIPTS_DIR}/build.sh

docker-compose build && docker-compose up -d
