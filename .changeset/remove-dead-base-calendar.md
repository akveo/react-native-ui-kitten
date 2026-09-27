---
"@ui-kitten/components": patch
---

Remove the unused `BaseCalendarComponent` class. `Calendar` and `RangeCalendar` have been hook-based since 6.0.0, and the class kept a second copy of the min/max and navigation logic that no longer ran. `BaseCalendarProps` now lives in `baseCalendar.props.ts`; it was never exported from the package entry point, so nothing changes for consumers.
