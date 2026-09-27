---
"@ui-kitten/components": patch
---

Style cache entries are now keyed by the compiled mapping as well, so a `customMapping` that changes at runtime restyles the components, and two `ApplicationProvider`s with different mappings no longer share styles. `ApplicationProvider` warns in development when `customMapping` is passed next to build-time `styles`, where it is ignored.
