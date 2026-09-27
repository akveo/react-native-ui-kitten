---
"@ui-kitten/components": patch
---

`Modal` and `Popover` (so also `Select`, `Datepicker`, `RangeDatepicker`, `OverflowMenu`, `Tooltip`) allow every orientation by default (#1911). React Native's `Modal` supports portrait only when `supportedOrientations` is omitted, so a popover opened while the device was in landscape came up rotated. iOS still restricts the modal to the orientations in the app's `Info.plist`.
