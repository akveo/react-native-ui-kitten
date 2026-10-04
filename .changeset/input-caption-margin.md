---
"@ui-kitten/components": patch
"@ui-kitten/eva": patch
---

`Input`, `Select`, `Datepicker` and `RangeDatepicker` space their caption from the field by the mapping `captionMarginTop` (4 in Eva and Material); the token was defined but never applied, so captions sat flush under the field. The Eva mapping gains the token for `Input`, `Select` and `Datepicker` (Material already had it). The `Datepicker` popover no longer takes `captionMarginTop` as its bottom margin. Screens with captions move them 4 dp down.
