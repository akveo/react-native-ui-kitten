---
"@ui-kitten/components": patch
---

`Autocomplete` derives its input field's test ids from `testID` (`@@<testID>/input/input`, container `@@<testID>/input/container`) instead of the fixed `@@autocomplete/input/input`, so several autocompletes on one screen can be told apart in tests. Without a `testID` the field keeps the old id.
