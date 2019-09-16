#!/usr/bin/env bash

env=${1}

if [[ $env == "beta" ]]
then
    npm publish --tag beta --access=public ./dist/tsc-out/framework
else
    npm publish --access=public ./dist/tsc-out/framework
fi
