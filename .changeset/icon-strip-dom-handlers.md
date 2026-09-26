---
"@ui-kitten/components": patch
---

`Icon` no longer forwards DOM-only handlers (`onClick` and the mouse events) to the icon element on
iOS and Android. `TouchableWithoutFeedback` and the other touchables clone React Native's full
`Pressability` handler set onto their child, so an `Icon` rendered as a touchable's child received
`onClick`; on the legacy architecture react-native-svg crashed with
`-[RNSVGSvgView setOnClick]: unrecognized selector` (#1801, #1733). Responder handlers still pass
through, and on web every handler is kept because they are real DOM props there.
