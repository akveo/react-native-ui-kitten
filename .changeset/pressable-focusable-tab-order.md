---
"@ui-kitten/components": patch
---

Keep `focusable={false}` touchables out of the keyboard tab order on web. react-native-web's `Pressable` always sets an explicit `tabIndex`, which overrode `focusable`, so the tap-forwarding wrapper around `Input` had become an extra Tab stop before the text field.
