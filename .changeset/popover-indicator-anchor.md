---
"@ui-kitten/components": patch
---

`Tooltip` (and any `Popover` with an `indicator`) keeps its arrow pointing at the anchor when the content was moved to stay on screen, for example a wide tooltip on a button near a screen edge: the arrow follows the anchor centre instead of staying in the middle of the tooltip, and stays inside the tooltip's edges.
