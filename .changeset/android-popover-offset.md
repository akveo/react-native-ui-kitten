---
"@ui-kitten/components": patch
---

Fix Popover, Tooltip, OverflowMenu, Select, Autocomplete and Datepicker content rendering on top of
its anchor on edge-to-edge Android (React Native 0.81+, Expo 54). React Native presents every
`Modal` window edge-to-edge there, so the anchor position measured below the status bar is now
shifted by the status bar height without requiring `ModalService.setShouldUseTopInsets`. Also
guards the `shouldUseTopInsets` offset against a missing `StatusBar.currentHeight`.
