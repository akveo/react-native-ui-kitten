---
"@ui-kitten/components": patch
---

`Input` no longer derives `@undefined/container` and `@undefined/input` test identifiers when
no `testID` is passed. Derived identifiers are only emitted for an explicit `testID`, so the
wrapper and the text field stay free of placeholder identifiers in the accessibility tree.
Components that wrap `Input`, such as `Autocomplete`, are covered by the same guard.
