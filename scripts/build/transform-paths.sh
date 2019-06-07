#!/usr/bin/env bash

env=${1}
tscpaths -p ./tsconfig.${env}.json -s ./src -o ./dist/tsc-out
