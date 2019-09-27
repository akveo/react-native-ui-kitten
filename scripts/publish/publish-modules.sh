#!/usr/bin/env bash

env=${1}

if [[ $env == "beta" ]]
then
    npm publish --tag beta --access=public ./dist/tsc-out/date-fns
    npm publish --tag beta --access=public ./dist/tsc-out/eva-icons
    npm publish --tag beta --access=public ./dist/tsc-out/moment
    npm publish --tag beta --access=public ./dist/tsc-out/templates/template-ui-kitten
    npm publish --tag beta --access=public ./dist/tsc-out/templates/template-ui-kitten-typescript
else
    npm publish --access=public ./dist/tsc-out/date-fns
    npm publish --access=public ./dist/tsc-out/eva-icons
    npm publish --access=public ./dist/tsc-out/moment
    npm publish --access=public ./dist/tsc-out/templates/template-ui-kitten
    npm publish --access=public ./dist/tsc-out/templates/template-ui-kitten-typescript
fi
