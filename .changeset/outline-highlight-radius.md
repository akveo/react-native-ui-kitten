---
"@ui-kitten/components": patch
---

Keep the press and focus highlight of `Toggle`, `CheckBox` and `Radio` rounded on Android. Fabric drops the border radius of a view whose background turns from transparent into a colour after it is mounted (facebook/react-native#52415, React Native 0.80 and newer), so the outline drew as a rectangle while pressed. The highlight now clips to its own shape.
