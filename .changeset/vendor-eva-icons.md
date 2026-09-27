---
"@ui-kitten/eva-icons": minor
---

Vendor Eva Icons instead of depending on `react-native-eva-icons`.

`react-native-eva-icons@1.3.1` pins `peerDependencies.react` to exactly `16.5.0`, so every install
on a current React needs `--legacy-peer-deps` or an override, and that workaround often ends with
two copies of React and "A React Element from an older version of React was rendered" (#1851). Its
icon barrel is one function with 490 static `require` calls, so the whole set lands in every bundle
whether the app renders an icon or not (#1771).

The 490 icons are now generated from the `eva-icons@1.1.3` SVGs into per-icon data modules inside
this package and rendered by one `EvaIcon` component. The only peer dependency left is
`react-native-svg >= 13`.

- `EvaIconsPack` works as before. Unknown names now raise the registry's "icon is not registered"
  error instead of crashing on an undefined element type.
- `createEvaIconsPack([home, star])` with `import home from '@ui-kitten/eva-icons/icons/home'`
  builds a pack from only the icons an app uses, so nothing else is bundled.
- `EvaIcon` and `createEvaIcon(data)` render an icon outside of `<Icon />`; `evaIcons` and
  `EvaIconName` expose the full set.
- `corner-down-left`, `droplet` and their outlines keep their own 24.1 / 24.2 `viewBox` instead of
  being forced onto a 24 canvas.

Attribution ships in the package `LICENSE` (Eva Icons, MIT, Copyright (c) 2018 Akveo).
