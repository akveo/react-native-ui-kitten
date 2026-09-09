---
'@ui-kitten/components': patch
---

Document the v5 → v6 migration and ship a codemod that performs most of it.

`website/docs/migration/5x-to-6.md` is new: ref types, the React 19 fallout, the `styled` removal,
the `@eva-design/*` moves, and the Jest change the ESM-only build requires.

The codemod itself lives at `src/codemod` and is private for now, so it does not join the release
set. Two documentation samples that still imported `@eva-design/eva` now import `@ui-kitten/eva`,
matching the install instructions.
