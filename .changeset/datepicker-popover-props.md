---
"@ui-kitten/components": minor
---

`Datepicker` and `RangeDatepicker` gain `popoverProps`, props for the `Popover` that shows the calendar:
`fullWidth` makes the calendar take the width of the control (the calendar already shrinks to its container
since 6.1.3), `style` is merged after the built-in popover style, and `blocking`, `anchorContainerStyle` or
`onBackdropPress` (called before the picker closes) pass through. `placement` and `backdropStyle` set directly
on the picker win (#1707).
