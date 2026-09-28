---
"@ui-kitten/components": minor
---

`Input` gains `textInputRef`, a ref to the underlying React Native `TextInput`, for libraries that expect a
native input (`setNativeProps`, `measure`, ...). The component ref keeps the `InputRef` API (`focus`, `blur`,
`isFocused`, `clear`). `Autocomplete` forwards it to its `Input` (#1520).
