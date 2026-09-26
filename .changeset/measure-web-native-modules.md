---
"@ui-kitten/components": patch
---

Fix the web bundle breaking with `"TurboModuleRegistry" is not exported by "react-native-web"`.
The edge-to-edge Android check in `MeasureElement` now reads the `DeviceInfo` constants through
`NativeModules`, which react-native-web ships as a shim and bridgeless React Native forwards to the
TurboModule registry, so web bundlers such as Vite, Rollup and webpack resolve the import again.
