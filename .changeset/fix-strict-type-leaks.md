---
"@ui-kitten/components": patch
"@ui-kitten/moment": patch
"@ui-kitten/date-fns": patch
---

Stop leaking type errors into consumer projects under `strict` without `skipLibCheck`.

Six errors reached apps that typecheck their `node_modules`:

- `ThemedThemeType` declared an optional `__themeId` on an interface extending an index-signature type, which emitted a TS2411 error in `themeStore.d.ts`.
- `withStyles` left its style generic unconstrained, so the returned `ThemedComponentClass` emitted two TS2344 errors.
- `MomentDateService.localeData` is assigned via `setLocale()` from the constructor, which TypeScript cannot see (TS2564).
- `DateFnsService` passed the optional `options.format` straight to date-fns (TS2345, twice).

`@ui-kitten/moment` and `@ui-kitten/date-fns` publish no `.d.ts` and point `types` at their raw TypeScript, so their source is typechecked directly by consumers — the last two now compile cleanly under `strict`.
