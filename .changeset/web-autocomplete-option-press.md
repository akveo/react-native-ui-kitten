---
"@ui-kitten/components": patch
---

On web, clicking an `Autocomplete` option with the mouse selects it: the mouse-down no longer moves the focus away from the input, whose blur closed the list before the click arrived. `Modal` sets `pointerEvents` through its style, which removes react-native-web's "props.pointerEvents is deprecated" warning.
