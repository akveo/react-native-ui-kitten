---
"@ui-kitten/components": patch
"@ui-kitten/eva-icons": patch
"@ui-kitten/moment": patch
"@ui-kitten/date-fns": patch
"@ui-kitten/processor": patch
---

Stop shipping build leftovers in the published tarballs.

builder-bob is configured with `source: "."`, so it swept the package root into the build output. Every ESM package published a `lib/module/package.json` that was a **copy of its own manifest** — with no `"type": "module"` field and a `main` pointing at a path that does not exist — alongside `lib/module/CHANGELOG.md` and `lib/module/tsconfig.build.json`. Toolchains that determine module type from the nearest `package.json` would read the ESM output as CommonJS; it only worked because Node falls back to syntax detection. bob now writes its own `{"type": "module"}` marker instead.

`@ui-kitten/processor` also shipped 38 spec and spec-config files (its `!*.spec.*` exclusion only matched the package root, not `js/`), which is a third of the tarball.
