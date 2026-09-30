---
"@ui-kitten/components": patch
---

`Popover` (and `Select`, `Datepicker`, `Tooltip`, `OverflowMenu`) no longer draws its content at the window origin for a frame on the first open (#1910). The anchor keeps the same place in the element tree from the start, so opening the popover no longer remounts it (an `Autocomplete` field no longer loses focus on the first tap); a closed popover still measures nothing. The content stays off screen until the anchor frame is known and follows the anchor when its frame changes while open.
