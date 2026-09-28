---
"@ui-kitten/components": minor
---

`Select` gains `placement` (default `bottom`, the same values as `Autocomplete` and `Datepicker`) and
`popoverProps`, props for the `Popover` that shows the options: `fullWidth` (still `true` by default; `false`
sizes the list by its content or `style`), `blocking`, `anchorContainerStyle`, `backdropStyle`, `style` and
`onBackdropPress`, which runs before the list closes (#1331).
