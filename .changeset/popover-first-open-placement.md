---
"@ui-kitten/components": patch
---

`Popover` (and `Select`, `Datepicker`, `Tooltip`, `OverflowMenu`) no longer draws its content at the window origin for a frame on the first open (#1910). The anchor is measured from the start instead of only after the first show, so opening the popover no longer remounts the anchor, and the content stays off screen until the anchor frame is known and follows the anchor when its frame changes while open.
