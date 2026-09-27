---
"@ui-kitten/components": patch
---

Keep `Popover` and `Tooltip` content on screen. The content is now capped at the window width, so a long text measures the same wherever it is placed instead of one very wide line off screen, and when no placement fits next to the anchor the chosen frame is moved back inside the window rather than left cut off at the edge.
