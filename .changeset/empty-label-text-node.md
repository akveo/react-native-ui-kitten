---
"@ui-kitten/components": patch
---

`Button`, `CheckBox`, `Radio` and `Toggle` render nothing for an empty string label instead of an empty text node inside their `View` (#1913), which react-native-web reported as "Unexpected text node".
