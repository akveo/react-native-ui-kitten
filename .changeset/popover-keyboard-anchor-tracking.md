---
"@ui-kitten/components": patch
---

`Popover` (and `Autocomplete`, `Select`, `Datepicker`, `Tooltip`, `OverflowMenu`) keeps its content out from under the software keyboard: the keyboard height is subtracted from the placement bounds, so a list that would open under the keyboard flips to the other side of the anchor, and the placement is redone when the keyboard appears or hides while the popover is open. A non-blocking popover (`Autocomplete`) now follows its anchor while the screen behind it scrolls, and hides the content while the anchor is out of view.
