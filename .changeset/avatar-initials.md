---
"@ui-kitten/components": minor
"@ui-kitten/eva": minor
"@ui-kitten/material": minor
---

`Avatar` gains `name` and `status`. Without a `source`, or when the image fails to load, `name` renders
as initials (the first letter of the first two words) in a frame of the same size and shape, coloured by
`status`, and is the avatar's accessible name. The Eva and Material `Avatar` mappings gain `textFontSize`
per size, `textFontFamily` / `textFontWeight`, and a `status` variant group with `backgroundColor` /
`textColor` (#1806).
