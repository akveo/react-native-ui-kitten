---
"@ui-kitten/components": patch
---

Stop `Modal` and `Popover` from vibrating by one pixel when their content has a fractional size. `MeasureElement` now reports whole points, and a re-measure that moves the content by at most one point no longer repositions it: native layout snaps a fractional width to the pixel grid, so the measured width alternated with every move and the modal repositioned itself forever.
