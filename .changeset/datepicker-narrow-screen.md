---
"@ui-kitten/components": patch
---

Keep the `Datepicker` and `RangeDatepicker` calendar inside the window on screens narrower than the mapping's 344 dp calendar width (320 dp devices): the picker popover is clamped to the window width with an 8 dp inset on each side, and the `Calendar` / `RangeCalendar` container is capped at its parent width so day cells flex instead of the Saturday column being clipped at the right edge.
