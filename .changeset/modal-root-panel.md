---
"@ui-kitten/components": minor
---

`Modal` (and therefore `Popover`, `Select`, `Autocomplete`, `Datepicker`, `RangeDatepicker`,
`Tooltip` and `OverflowMenu`) now presents its content through a root-level panel that
`ApplicationProvider` renders around the app, instead of rendering the React Native `Modal`
at the call site.

**What moved.** The native modal is still a React Native `Modal`, but in the React tree it is
now a sibling of the app content rather than a descendant of the view that opened it. With
the keyboard open, a `ScrollView`, `FlatList` or `SectionList` with the default
`keyboardShouldPersistTaps='never'` used to claim the first tap on modal content during the
responder capture phase (root to target, first `true` wins) and only dismiss the keyboard, so
an `Autocomplete` option needed two taps. Modal content is no longer inside that list, so a
single tap selects. Setting `keyboardShouldPersistTaps='handled'` on the host list is no
longer required; it stays harmless.

**Nesting.** iOS presents one chain of modals only: a second modal presented from a view
controller that is already presenting is refused. An overlay opened from inside a UI Kitten
`Modal` therefore registers with that modal as its parent and renders inside the parent's
native modal, so Select, Tooltip, Popover and Datepicker keep working inside a `Modal`.

**Consumer contexts.** The presented element leaves the call site, so React contexts
provided *below* `ApplicationProvider` (navigation, i18n, form libraries, your own providers)
are no longer visible inside modal content. UI Kitten's own theme and mapping contexts are
bridged, so nested `ThemeProvider` overrides still apply. Either move those providers above
`ApplicationProvider`, wrap the modal content in them, or opt a given modal out with the new
`renderInline` prop on `Modal` and `Popover`, which restores the previous inline rendering
(and the first-tap behaviour) for that modal and everything nested inside it.

**Overlay inside your own React Native `Modal`.** Such an overlay has no hoisted parent and
would be presented from the root, which iOS refuses while your modal is showing. Either wrap
that modal's content in a nested `ApplicationProvider` (its panel then presents overlays from
inside your modal) or pass `renderInline`. Rendering
`<ModalPanelContext.Provider value={null}>` forces inline rendering for a whole subtree.

A `Modal` rendered without any `ApplicationProvider` above it still works: it renders inline
as before and warns once in development.
