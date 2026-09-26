---
"@ui-kitten/components": minor
"@ui-kitten/processor": minor
---

Resolve component styles on demand instead of expanding every appearance, variant and state combination when `ApplicationProvider` mounts.

Runtime mapping processing used to build all 4051 style entries of the Eva mapping (about 1.8 MB) before the first frame, which took ~350 ms on a Pixel 7 emulator with Hermes and seconds on low-end Android phones. `ApplicationProvider` now builds a per-component resolver that compiles a single combination the first time a component asks for it and memoizes it. Startup cost drops to under 10 ms; the compiled styles are identical, and the `styles` prop produced by `@ui-kitten/metro-config` keeps working unchanged.

`@ui-kitten/processor` now exports `createStyle`, `needsAllVariantCases` and `MetaProcessor`, which the resolver uses.

Per-render work is reduced as well:

- Every interactive component now presses through `Pressable` instead of `TouchableOpacity`. UI Kitten paints its own press, hover and focus states, so the opacity animation `TouchableOpacity` set up on every render did nothing visible and cost up to a quarter of render time. Public props are unchanged (`onMouseEnter` / `onMouseLeave` map to Pressable's hover events); refs now point at a `View`, and `activeOpacity` is ignored.
- Exported components are wrapped in `React.memo`. A parent re-render with referentially equal props no longer re-renders them; theme changes still reach them. Inline callbacks, element children and render-prop accessories keep re-rendering as before, so hoist or memoize those to benefit.
- Theme compilation and style resolution use plain loops instead of `reduce` with object spread.

