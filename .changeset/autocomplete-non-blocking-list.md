---
"@ui-kitten/components": patch
---

`Autocomplete` no longer opens its suggestions in a modal. The list floats above the app through the `ApplicationProvider` panel without a backdrop, so the first tap on a button beside the field reaches that button instead of only closing the list, and the field is a single real `TextInput`: `onFocus` / `onBlur` are its own focus events and `onBlur` fires when it loses focus. The list closes on blur, on selection, on submit and when the keyboard is dismissed. The default `placement` is now `bottom` (the `inner` placements cover the field). `Modal` and `Popover` gain a `blocking` prop (default `true`) that exposes the same non-blocking presentation.
