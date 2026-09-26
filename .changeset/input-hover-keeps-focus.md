---
"@ui-kitten/components": patch
---

`Input` no longer loses its focused styling on web when the pointer enters or leaves the field.
Eva has no combined hover + focused state, so the hover handlers used to replace the focused
interaction with hover and then clear it on mouse-out, leaving a focused field styled as idle
(#1401). Hover is now ignored while the field is focused. Ported from #1779 by @raqso.
