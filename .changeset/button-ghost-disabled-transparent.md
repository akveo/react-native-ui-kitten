---
"@ui-kitten/eva": patch
"@ui-kitten/material": patch
---

A disabled ghost `Button` stays transparent. The `disabled` state of every ghost status set
`backgroundColor` to the literal `color-basic-transparent-200`, painting a grey fill that no theme
token could override (#1507).
