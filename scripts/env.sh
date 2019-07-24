#!/bin/bash

set -eu
set -o pipefail

title (){
    echo ""
    echo "################################################################################"
    echo "# $1  "
    echo "################################################################################"
    echo ""
}

SCRIPTS_DIR=$(cd "$(dirname "$0")" && pwd -P)
PROJECT_ROOT=$(cd "$(dirname "$0")" && pwd -P)/..
