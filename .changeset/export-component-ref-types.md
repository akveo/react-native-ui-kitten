---
"@ui-kitten/components": patch
---

Export `AutocompleteRef`, `InputRef`, and `ListRef` from the package root.

All three were defined and exported by their own modules but never re-exported from the
barrel, so consumers had no way to type a ref for `Autocomplete`, `Input`, or `List` —
the same gap that made `IconRef` unusable in practice. They now sit alongside the
already-exported `CalendarRef`, `DatepickerRef`, `RangeCalendarRef`, `RangeDatepickerRef`,
and `SelectRef`.
