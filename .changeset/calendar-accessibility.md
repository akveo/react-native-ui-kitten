---
"@ui-kitten/components": minor
---

Calendar navigation is now reachable for assistive technology. `Calendar`, `RangeCalendar`,
`Datepicker` and `RangeDatepicker` accept `arrowLeftAccessibilityLabel` and
`arrowRightAccessibilityLabel` to name the header's previous / next controls, which were
unlabelled buttons before. Day, month and year cells expose a `button` role with their selected
and disabled state.

`Autocomplete` documents that the enclosing `ScrollView` or list needs
`keyboardShouldPersistTaps='handled'`; with React Native's default the first tap on an option
only dismisses the keyboard.
