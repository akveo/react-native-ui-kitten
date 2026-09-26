---
"@ui-kitten/components": patch
---

Render props given as elements keep their own `style`. `accessoryLeft`, `accessoryRight`, `label`,
`caption`, `title` and every other `RenderProp` accepted a React element, but the style the parent
component passed in (a `Button`'s text style, an `Input`'s icon size) replaced the element's own,
so `<Button accessoryLeft={<Icon style={{ width: 32 }} />} />` rendered at the default icon size.
The element's style is now merged on top of the parent's defaults (#1497, #1792).
