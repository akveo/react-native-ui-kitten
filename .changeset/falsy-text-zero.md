---
"@ui-kitten/components": patch
---

A numeric `0` label or title now renders as "0" instead of nothing. `FalsyText` (used for the labels, captions and titles of `Button`, `CheckBox`, `Radio`, `Toggle`, `Input`, `ListItem` and others) rendered nothing for any falsy value; it now skips only `null`, `undefined`, `false` and an empty string.

Apps that hide a text prop with a number and `&&` now show a stray "0": `` description={count && `${count} items`} `` renders "0" when `count` is 0, as React itself does for `{0 && ...}`. Use `count > 0 && ...` instead.
