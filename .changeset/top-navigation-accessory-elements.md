---
"@ui-kitten/components": patch
---

Accept elements for `TopNavigation` accessories, and fix `RTLService.isRTL()` on web.

`TopNavigationProps.accessoryLeft` and `accessoryRight` were typed `() => ReactElement` while the JSDoc promised `ReactElement | () => ReactElement` and the runtime accepted both — the element form rendered correctly but failed to typecheck. They are now `RenderProp`, matching `Button` and the rest of the library.

`RTLService.isRTL()` returned `I18nManager.isRTL` unguarded. react-native-web leaves that undefined, so a method declared to return `boolean` returned `undefined` on web, and `ignoreRTL()`'s default argument came out undefined with it.
