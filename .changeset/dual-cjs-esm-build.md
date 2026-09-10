---
"@ui-kitten/components": patch
"@ui-kitten/date-fns": patch
"@ui-kitten/eva-icons": patch
"@ui-kitten/moment": patch
---

Ship a dual CommonJS + ES module build with type definitions that work under every
TypeScript module resolution.

`@ui-kitten/components` published ESM-only output whose `.d.ts` files sat in an ES-module
scope (`lib/typescript/package.json` with `"type": "module"`) but used extensionless relative
imports. Under `moduleResolution: node16` / `nodenext` TypeScript rejected them with TS2834,
which made every root export disappear (`Module '"@ui-kitten/components"' has no exported
member 'Button'`). `@ui-kitten/date-fns`, `@ui-kitten/eva-icons` and `@ui-kitten/moment`
pointed `main` at ESM without a `"type"` field and `types` at their raw `.ts` source, so they
were reported as `Masquerading as CJS` and consumers compiled the library's TypeScript under
their own tsconfig.

All four packages now build `lib/commonjs`, `lib/module` and generated declarations for both
(`lib/typescript/commonjs`, `lib/typescript/module`) via react-native-builder-bob, and the
relative imports in the ESM declarations carry explicit `.js` extensions. `exports` exposes
`import` and `require` conditions with matching `types`; the `react-native` and `source`
conditions still resolve to the TypeScript source for Metro. `@arethetypeswrong/cli` reports
no problems for `node10`, `node16` (CJS and ESM) and `bundler`.
