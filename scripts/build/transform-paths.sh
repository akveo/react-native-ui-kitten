#!/usr/bin/env bash

# do not transform additional modules like moment or date-fns
# because it should not contain module aliases

env=${1}
tscpaths -p ./tsconfig.${env}.json -s ./src/framework -o ./dist/tsc-out/framework
