#!/bin/bash
#
# Proves the `jest-transform-ignore` rule is real rather than theoretical.
#
# v6 publishes ES modules only (`main` is `./lib/module/index.js`, and the bob config has no
# commonjs target), so a Jest setup that *ignores* `@ui-kitten` hands raw ESM to a CommonJS runtime
# and dies. The rule adds `@ui-kitten` to the allow-list; this script runs Jest either side of that
# change and shows the difference.
#
# Usage:  bash src/codemod/__e2e__/jest-esm.sh [work-dir]
#
set -u

HERE="$(cd "$(dirname "$0")" && pwd)"
CODEMOD="$(dirname "$HERE")"
WORK="${1:-${TMPDIR:-/tmp}/uikitten-codemod-jest}"

say () { printf '\n################ %s ################\n' "$1"; }

say "staging a minimal v5-style Jest project in $WORK"
rm -rf "$WORK"
mkdir -p "$WORK/__tests__"

cat > "$WORK/package.json" <<'JSON'
{
  "name": "uikitten-jest-esm",
  "version": "0.0.1",
  "private": true,
  "jest": {
    "preset": "react-native",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)"
    ]
  }
}
JSON

cat > "$WORK/__tests__/import.test.js" <<'JS'
// The whole test is the import: under v6 this line is ESM, so Jest must transform the package.
const { Button } = require('@ui-kitten/components');

it('can load @ui-kitten/components', () => {
  expect(Button).toBeDefined();
});
JS

cat > "$WORK/babel.config.js" <<'JS'
module.exports = { presets: ['module:@react-native/babel-preset'] };
JS

say "installing v6 plus a Jest toolchain"
(
  cd "$WORK" || exit 1
  npm install --no-audit --no-fund --loglevel=error \
    @ui-kitten/components@6.0.0-beta.2 \
    @ui-kitten/eva@6.0.0-beta.1 \
    @ui-kitten/processor@6.0.0-beta.1 \
    react@19.1.0 react-native@0.81.1 react-native-svg@15.13.0 \
    jest@29.7.0 babel-jest@29.7.0 @babel/core@7.24.0 \
    @react-native/babel-preset@0.81.1 react-test-renderer@19.1.0 2>&1 | tail -3
)

say "BEFORE — @ui-kitten is ignored, so Jest sees raw ESM"
(
  cd "$WORK" || exit 1
  ./node_modules/.bin/jest 2>&1 | head -25
  echo "(jest exit: ${PIPESTATUS[0]})"
)

say "applying only the jest-transform-ignore rule"
node "$CODEMOD/bin/ui-kitten-codemod" "$WORK" \
  --rules jest-transform-ignore --write --force --offline --no-report
grep -n 'transformIgnorePatterns' -A 2 "$WORK/package.json"

say "AFTER — @ui-kitten is transformed"
(
  cd "$WORK" || exit 1
  ./node_modules/.bin/jest 2>&1 | tail -12
  exit "${PIPESTATUS[0]}"
)
STATUS=$?

say "RESULT"
if [ "$STATUS" -eq 0 ]; then
  echo "PASS — the patched config loads @ui-kitten/components"
else
  echo "FAIL — Jest still cannot load @ui-kitten/components (exit $STATUS)"
fi
exit "$STATUS"
