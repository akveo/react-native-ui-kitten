---
"@ui-kitten/components": patch
---

Stop adding the status bar height to measured frames on edge-to-edge Android with React Native 0.86 and newer. React Native 0.86 changed Android `measureInWindow` to report positions from the top of an edge-to-edge window, the same coordinate space its `Modal` windows use, so the compensation that closed the gap on 0.81 through 0.85 now pushed every `Select`, `Popover`, `Tooltip`, `Autocomplete`, `Datepicker` and `OverflowMenu` down by one status bar. The offset is now applied only on the React Native versions that still measure below the status bar.
