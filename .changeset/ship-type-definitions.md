---
"@ui-kitten/components": patch
---

Ship generated type definitions instead of raw source.

`types` pointed at `./index.ts`, so consuming projects typechecked the library's own
source under their tsconfig and saw 221 errors from `node_modules` — with no workaround,
since `skipLibCheck` only skips `.d.ts` files. The package now builds `.d.ts` via
react-native-builder-bob's `typescript` target and points `types` at
`./lib/typescript/index.d.ts`.

Fixing the 22 type errors that blocked declaration output also corrected real bugs:

- `React.ReactText` was removed in React 19; replaced with `string | number` across 19 sites
- `Calendar`'s `getViewMode()` was typed `() => string` but returns a `CalendarViewMode`
- `TabView`'s view pager ref was typed as the component value rather than `ViewPagerRef`
- `DatepickerProps` declared conflicting `onBlur`/`onFocus` inherited from `ViewProps`
- `dateService` widened to `NativeDateService | DateService<D>` instead of `DateService<D>`

`Button`, `Select`, and `Datepicker` now accept `string | number` for text props, matching
`CheckBox`/`Toggle`/`Radio` and the runtime behaviour of `FalsyText`. Previously the
idiomatic `<Button>TEXT</Button>` did not typecheck.

Type-only changes — the compiled bundle is byte-identical.
