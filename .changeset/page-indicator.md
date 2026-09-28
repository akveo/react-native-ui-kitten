---
"@ui-kitten/components": minor
"@ui-kitten/eva": minor
"@ui-kitten/material": minor
---

New `PageIndicator`: dots for a `ViewPager`, one per page, the selected one wider and coloured by `status`.
Feed it `selectedIndex`, optionally `progress` (`offset / pageWidth` from `onOffsetChange`) so the dots
follow the swipe, and `onSelect` to jump to a pressed dot. Dot size, spacing and colours come from the new
`PageIndicator` block of the Eva and Material mappings. `ViewPager` now forwards a consumer `onLayout` (the
layout of its content strip, pages x page width) instead of dropping it (#1355).
