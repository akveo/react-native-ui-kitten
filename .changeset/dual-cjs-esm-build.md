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

Every export object also ends with a `default` condition pointing at the CommonJS build with
matching types, as a fallback for resolvers that match none of `source`, `react-native`,
`import` or `require`.

The dual layout costs tarball size. Measured with `npm pack` (bytes, gzip):

| package                  | 6.0.0-beta.2 (ESM only) | dual build | dual build, trimmed |
| ------------------------ | ----------------------: | ---------: | ------------------: |
| `@ui-kitten/components`  |                 375 697 |    479 774 |             421 524 |
| `@ui-kitten/moment`      |                   3 780 |      6 240 |               5 458 |
| `@ui-kitten/eva-icons`   |                   2 760 |      4 591 |               4 082 |
| `@ui-kitten/date-fns`    |                   2 343 |      3 651 |               3 362 |

The trimmed column drops the `.js.map` files from `lib/commonjs` (the `module` tree keeps its
source maps). The `.d.ts.map` files are kept in both declaration trees: without them,
go-to-definition lands on the generated `.d.ts` instead of the shipped `.ts` source. The
remaining growth is the second JavaScript build and the second copy of the declarations,
which is the price of resolving correctly under both `require` and `import`.
