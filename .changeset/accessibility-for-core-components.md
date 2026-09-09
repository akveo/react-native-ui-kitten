---
"@ui-kitten/components": minor
---

Add accessibility support for `Button`, `Input`, `CheckBox`, `Radio`, `RadioGroup`, `Toggle`,
`Select`, `SelectItem`, `ProgressBar`, `CircularProgressBar`, `Spinner`, `Modal` and `Popover`.

These components now expose a role, and where applicable their checked, selected, expanded,
disabled, busy and numeric value state, to VoiceOver, TalkBack and web screen readers. Before
this change no component in the library set a single accessibility prop, so screen reader
users received an unlabelled view hierarchy.

The props are emitted as `role` and `aria-*` rather than `accessibilityState` and
`accessibilityValue`. React Native Web does not read either of those objects, so the
conventional spelling would have produced correct native output and no web accessibility at
all. `accessibilityRole` is emitted alongside `role` because `TouchableOpacity` ignores
`role`. Anything a consumer passes — in modern or legacy spelling — still takes precedence.

Overlays gain `aria-modal` and support the iOS escape gesture. `Modal` and `Popover` accept a
new `backdropAccessibilityLabel` prop; without it the backdrop stays out of the accessibility
tree rather than appearing as an unnamed control.

Coverage is deliberately partial. Focus management in overlays, `Menu`, `Drawer`, the
navigation components, `Autocomplete` and the calendar grid are not addressed — see the
accessibility guide for the full list and for the touch-target sizes that fall below the
platform minimums.

**Behaviour change:** `Select` previously discarded every pass-through prop before rendering
its trigger, so `aria-label`, `accessibilityLabel` and other `TouchableWebProps` members
declared by `SelectProps` had no effect. They now reach the trigger as the type always
implied. Code that passed such a prop to `Select` and relied on it being ignored will see it
apply.
