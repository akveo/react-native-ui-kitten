---
"@ui-kitten/components": minor
"@ui-kitten/eva": minor
"@ui-kitten/material": minor
---

Typed theme tokens. `@ui-kitten/eva` exports `EvaThemeKey` (the union of every token in the light and dark
themes) and `EvaTheme`, and types `light` / `dark` with it; `@ui-kitten/material` does the same with
`MaterialThemeKey` / `MaterialTheme`. `@ui-kitten/components` exports `KnownThemeKey` (the union of both)
and `ThemeKey` (`KnownThemeKey | string`); `ThemeType`, `useTheme()` and the `useThemeValue` selectors
suggest the known tokens while custom tokens still type-check through the `string` index signature.
The types are generated from the theme JSON files (`yarn theme-types:generate`, checked in CI) (#1682).
