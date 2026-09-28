---
"@ui-kitten/components": patch
---

`Select` scrolls its options to the selected one when the list opens (the first selected option of a
multi-select, the group row of a grouped option), so a selection past the visible rows is in view on
reopen. A `listProps.initialScrollIndex` takes over when set (#822).
