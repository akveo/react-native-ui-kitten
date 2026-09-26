---
"@ui-kitten/moment": patch
---

`MomentDateService.getDayOfWeekNames()` rotates the names to the locale's first day of week, matching
`NativeDateService` and the calendar's column layout. Locales that start the week on Monday (for
example `nl`, `de`, `en-gb`) showed the header one day off (#1603).
