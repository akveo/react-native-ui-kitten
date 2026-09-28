---
"@ui-kitten/components": minor
---

`ButtonGroup` no longer overwrites `appearance`, `status` and `size` set on a child `Button`; the child's
values win over the group's. It also gains `selectedIndex` and `onSelect`: the selected button renders
`filled` while the others keep the group appearance, and `onSelect` receives the index of the pressed
button after that button's own `onPress`, which makes a segmented toggle a two-prop change (#1369).
