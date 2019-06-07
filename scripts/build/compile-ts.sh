#!/usr/bin/env bash

env=${1}
tsc -p ./tsconfig.${env}.json
