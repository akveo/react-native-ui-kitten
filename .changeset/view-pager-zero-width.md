---
"@ui-kitten/components": patch
---

`ViewPager` and `TabView` stay quiet while laid out at zero width. On react-native-web a navigator keeps inactive screens mounted but hidden, and the pager used to report `NaN` as the selected index from there, which re-triggered its own animation in a loop and left the tabs unresponsive once the screen was shown again.
