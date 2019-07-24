#!/bin/bash

set -eu
set -o pipefail

. $(dirname "$0")/env.sh

mkdir -p ${PROJECT_ROOT}/.m2/repository

title "building scipio"
docker run --rm \
 --name scipio \
 -v ${PROJECT_ROOT}/:/app \
 -w /app \
 -u $UID \
 --net=scipio_local \
 maven:alpine \
 mvn -s /app/settings.xml clean install
