---
"@ui-kitten/components": patch
"@ui-kitten/eva": patch
"@ui-kitten/material": patch
---

`Select`'s `size` now reaches its options. `SelectOption` gains a `size` variant group in the Eva
and Material mappings (`small`, `medium`, `large`: text size, row padding and icon size), `SelectItem`
accepts `size`, and `Select` forwards its own `size` to every item, so `<Select size='large'>` no longer
renders 15px rows regardless of size (#1417, #1764).
