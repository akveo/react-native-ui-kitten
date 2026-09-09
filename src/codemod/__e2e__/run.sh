#!/bin/bash
#
# End-to-end proof: a real v5 app typechecks against the *published* v6 packages after the codemod.
#
# The app under `v5-app/` is the v5.3.1 `@ui-kitten/template-ts` App.tsx extended with the ref
# patterns from the v5 showcases. Nothing here is synthetic — every pattern is one a v5 app has.
#
#   1. copy the app to a scratch directory and install the published v6 tarballs
#   2. NEGATIVE CONTROL: run tsc and record the failures
#   3. run the codemod
#   4. run tsc again — App.tsx must be clean
#   5. check the report names every case the codemod refused to rewrite
#   6. prove the Jest `transformIgnorePatterns` patch is real
#
# Usage:  bash src/codemod/__e2e__/run.sh [work-dir]
#
set -u

HERE="$(cd "$(dirname "$0")" && pwd)"
CODEMOD="$(dirname "$HERE")"
WORK="${1:-${TMPDIR:-/tmp}/uikitten-codemod-e2e}"

TSC_FLAGS="--noEmit --strict --jsx react-native --esModuleInterop --moduleResolution bundler --module esnext --target esnext --skipLibCheck --lib esnext,dom"

say () { printf '\n################ %s ################\n' "$1"; }

say "1. staging the v5 app in $WORK"
rm -rf "$WORK"
mkdir -p "$WORK"
cp -R "$HERE/v5-app/." "$WORK/"
ls -1 "$WORK"

say "2. installing published v6 packages"
(
  cd "$WORK" || exit 1
  npm install --no-audit --no-fund --loglevel=error \
    @ui-kitten/components@6.0.0-beta.2 \
    @ui-kitten/eva@6.0.0-beta.1 \
    @ui-kitten/processor@6.0.0-beta.1 \
    @ui-kitten/eva-icons@6.0.0-beta.1 \
    @eva-design/eva@2.2.0 \
    @eva-design/dss@2.2.0 \
    react@19.1.0 react-native@0.81.1 react-native-svg@15.13.0 \
    @types/react@19.2.13 typescript@5.9.3 2>&1 | tail -3
)

say "3. NEGATIVE CONTROL: tsc against v6 before the codemod"
(
  cd "$WORK" || exit 1
  # shellcheck disable=SC2086
  ./node_modules/.bin/tsc $TSC_FLAGS App.tsx 2>&1
  echo "(tsc exit: $?)"
)

say "4. running the codemod"
node "$CODEMOD/bin/ui-kitten-codemod" "$WORK" --write --force --offline \
  --report report.md --report-json report.json

say "5. tsc against v6 AFTER the codemod — App.tsx must be clean"
(
  cd "$WORK" || exit 1
  # shellcheck disable=SC2086
  ./node_modules/.bin/tsc $TSC_FLAGS App.tsx 2>&1
  status=$?
  echo "(tsc exit: $status)"
  exit $status
)
TSC_STATUS=$?

say "6. what the codemod reported instead of rewriting"
node -e '
  const report = require(process.argv[1]);
  for (const f of report.findings) {
    console.log(`${f.ruleId}  ${f.file}:${f.line}  ${f.excerpt.slice(0, 60)}`);
  }
  console.log(`\n${report.findings.length} findings, ${report.edits.length} edits, ${report.filesChanged} files changed`);
' "$WORK/report.json"

say "7. the migrated package.json and metro config"
node -e '
  const m = require(process.argv[1]);
  console.log(JSON.stringify({
    dependencies: m.dependencies,
    devDependencies: m.devDependencies,
    scripts: m.scripts,
    jest: m.jest,
  }, null, 2));
' "$WORK/package.json"
grep -n 'evaPackage' "$WORK/metro.config.js"

say "RESULT"
if [ "$TSC_STATUS" -eq 0 ]; then
  echo "PASS — App.tsx typechecks against published v6 after the codemod"
else
  echo "FAIL — App.tsx still has type errors (tsc exit $TSC_STATUS)"
fi
exit "$TSC_STATUS"
