---
"@ui-kitten/metro-config": patch
---

Fix `@ui-kitten/metro-config` being unusable from `metro.config.js`.

The package is loaded by Node, not by Metro, but it was published as ESM only. `services/project.service.ts` used `__dirname`, which does not exist in ESM, so the documented usage threw `ReferenceError: __dirname is not defined in ES module scope` and took the whole Metro config down with it. The `ui-kitten` CLI binary was broken for a related reason: `bin/ui-kitten` required `../cli`, a directory that ships only TypeScript sources.

- Build this package as CommonJS instead of ESM, and emit real `.d.ts` files instead of pointing `types` at the raw source.
- Resolve the project root from `process.cwd()` rather than from the module's own location, which was also off by two directory levels in the compiled output.
- Point the `ui-kitten` binary at the compiled CLI.
