---
"@ui-kitten/components": patch
---

`Datepicker` and `RangeDatepicker` render their placeholder with the Eva `placeholderColor` and
the text font instead of the selected-value text style. The placeholder style was computed but
never applied, so the placeholder and a selected date looked identical (#1224). Ported from
#1240 by @rmarquois.
