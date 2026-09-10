---
"@ui-kitten/processor": patch
---

Stop publishing `js/src/tests/*`. The `files` field excluded `**/*.spec.*` and `**/__tests__/**`
but not the `tests/` directory, so six test files (and their `.d.ts` / `.map`) shipped in
`6.0.0-beta.1`. Every `@ui-kitten/*` package now excludes `**/__tests__/**`, `**/*.spec.*` and
`**/tests/**` consistently.
