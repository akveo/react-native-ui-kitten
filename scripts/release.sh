#!/usr/bin/env bash

# Validation
npm run lint
npm run test

# Re-compile TS
npm run clean
npm run build

# Publish
#npm publish ./dist/tsc-out/components
#npm publish ./dist/tsc-out/date-fns
#npm publish ./dist/tsc-out/eva-icons
#npm publish ./dist/tsc-out/moment
#npm publish ./src/templates/template-js
#npm publish ./src/templates/template-ts

# Documentation
#npm run parse-docs

#cd docs
#npm run clean
# add v3.1.4
#npm run build:prod
#npm run landing

#npm run gh-pages

