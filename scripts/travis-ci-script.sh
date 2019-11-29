#!/bin/bash

# Script that runs in every Travis CI container. The script is responsible for delegating
# to the different scripts that should run for specific Travis jobs in a build stage.

# The script should immediately exit if any command in the script fails.
set -e

# Go to project directory
cd $(dirname $0)/..

echo ""
echo "Building sources and running tests. Running mode: ${MODE}"
echo ""

if [[ -z "$TRAVIS" ]]; then
  echo "This script can only run inside of Travis build jobs."
  exit 1
fi

if [[ "${MODE}" = lint ]]; then
  npm run lint
elif [[ "${MODE}" = build ]]; then
  npm run build
elif [[ "${MODE}" =~ test ]]; then
  npm run test
fi
