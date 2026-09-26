---
"@ui-kitten/components": patch
---

`RangeCalendar` and `RangeDatepicker` never produce a range that spans a filtered day. Picking an end
date on the far side of a day that `filter` disables restarts the range from that end date instead of
silently including the disabled day (#1654).
