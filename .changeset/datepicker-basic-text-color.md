---
"@ui-kitten/eva": patch
"@ui-kitten/material": patch
---

`Datepicker` with the default `basic` status now uses `text-basic-color` for the selected date,
matching `Input` and `Select`. It used `text-hint-color`, the same value as its placeholder, so a
selected date was indistinguishable from an empty picker (#1224).
