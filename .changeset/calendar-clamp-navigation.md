---
"@ui-kitten/components": patch
---

`Calendar`, `RangeCalendar`, `Datepicker` and `RangeDatepicker` header arrows no longer page past an
explicit `min` or `max`. Navigating in the month, year-picker and month-picker views clamps to the
bounds, so a picker with `min={2020}` cannot be paged back to year -16 (#1759).
