---
"@ui-kitten/components": patch
---

Add `anchorContainerStyle` to `Popover` (and through it `Tooltip` and `OverflowMenu`). The anchor is rendered inside a wrapper view that is measured for placement, so `flex` on the anchor element only sized it inside that wrapper and two popovers could not share a row; the new prop styles the wrapper itself.
