---
"@ui-kitten/components": patch
---

A numeric `0` label or title now renders as "0" instead of nothing. `FalsyText` (used for the labels, captions and titles of `Button`, `CheckBox`, `Radio`, `Toggle`, `Input`, `ListItem` and others) rendered nothing for any falsy value; it now skips only `null`, `undefined`, `false` and an empty string.
