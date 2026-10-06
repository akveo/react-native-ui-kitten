<p align="center">
  <a href="https://akveo.github.io/react-native-ui-kitten">
    <img src="https://i.imgur.com/oMcxwZ0.png" alt="Eva Design System" height="60" />
  </a>
</p>

<h1 align="center">UI Kitten</h1>

<p align="center">
  React Native UI library built on the Eva Design System.<br />
  30+ themeable components, light and dark themes, runtime theme switching, iOS, Android and web.
</p>

<p align="center">
  <a href="https://akveo.github.io/react-native-ui-kitten/docs/getting-started/what-is-ui-kitten">Documentation</a>
  ·
  <a href="https://akveo.github.io/react-native-ui-kitten/docs/guides/getting-started">Getting Started</a>
  ·
  <a href="https://akveo.github.io/react-native-ui-kitten/docs/components/overview">Components</a>
  ·
  <a href="https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6">Migrate from v5</a>
  ·
  <a href="https://github.com/akveo/react-native-ui-kitten/blob/master/src/components/CHANGELOG.md">Changelog</a>
</p>

---

> **UI Kitten 6 is out.** It is rebuilt for React 19, React Native 0.81 and the New Architecture. Upgrading from 5.x? Run `npx @ui-kitten/codemod` and read the [5.x to 6 migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6).

## Installation

UI Kitten needs two packages plus `react-native-svg`:

```sh
# Expo
npx expo install @ui-kitten/components @ui-kitten/eva react-native-svg

# Bare React Native
npm install @ui-kitten/components @ui-kitten/eva react-native-svg
cd ios && pod install
```

Optional packages:

```sh
npm install @ui-kitten/eva-icons          # Eva Icons pack
npm install @ui-kitten/moment             # Calendar / Datepicker with moment
npm install @ui-kitten/date-fns           # Calendar / Datepicker with date-fns
npm install -D @ui-kitten/metro-config    # Build-time style processing
```

Starting from scratch? `npx create-expo-app@latest MyApp` and then run the Expo command above inside it. The [Getting Started guide](https://akveo.github.io/react-native-ui-kitten/docs/guides/getting-started) covers both paths in detail.

## Quick start

Wrap your app root in `ApplicationProvider` and pass it the Eva mapping and a theme:

```tsx
import React from 'react';
import * as eva from '@ui-kitten/eva';
import { ApplicationProvider, Button, Layout, Text } from '@ui-kitten/components';

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Hello UI Kitten</Text>
    <Button appearance='outline' status='primary'>
      GET STARTED
    </Button>
  </Layout>
);

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);
```

Switch to `eva.dark`, or spread your own theme over it, and every component re-renders with the new palette. See [Branding](https://akveo.github.io/react-native-ui-kitten/docs/guides/branding) and [Runtime Theming](https://akveo.github.io/react-native-ui-kitten/docs/guides/runtime-theming).

## Features

- **30+ components** — buttons, inputs, selects, calendars, lists, tabs, drawers, modals, popovers, menus and more, each with Eva appearances, statuses and sizes.
- **Eva Design System** — every component follows the [Eva](https://eva.design) specification. Ship the default look or supply your own mapping.
- **Theming** — light and dark themes out of the box, custom brand themes, and theme switching at runtime with no reload.
- **New Architecture ready** — function components and hooks throughout, verified on Fabric with React Native 0.81 and Expo 54.
- **TypeScript first** — generated `.d.ts` files, exported ref types and prop types for every component.
- **Cross-platform** — iOS, Android and the web via [React Native Web](https://necolas.github.io/react-native-web/).
- **Accessible** — roles, states and values exposed to VoiceOver, TalkBack and screen readers. See the [accessibility guide](https://akveo.github.io/react-native-ui-kitten/docs/guides/accessibility).
- **480+ Eva Icons** — optional SVG icon pack through `@ui-kitten/eva-icons`; register the full set or only the icons you import, or bring your own icon set.
- **Dual CJS + ESM build** — works with Metro, Vite, Jest and Node without extra configuration.

## Compatibility

| Dependency         | Minimum | Tested with             |
| ------------------ | ------- | ----------------------- |
| `react`            | 18.2    | 19.1                    |
| `react-native`     | 0.72    | 0.81 (New Architecture) |
| `react-native-svg` | 13      | 15.12                   |
| Expo               | SDK 49  | SDK 54                  |
| React Native Web   | 0.19    | 0.21                    |

## Packages

| Package | Description |
| --- | --- |
| [`@ui-kitten/components`](https://www.npmjs.com/package/@ui-kitten/components) | The components, theming hooks and `ApplicationProvider`. |
| [`@ui-kitten/eva`](https://www.npmjs.com/package/@ui-kitten/eva) | Eva mapping plus the light and dark themes. Required. |
| [`@ui-kitten/material`](https://www.npmjs.com/package/@ui-kitten/material) | Alternative Material-flavoured mapping and themes. |
| [`@ui-kitten/eva-icons`](https://www.npmjs.com/package/@ui-kitten/eva-icons) | 480+ Eva Icons as an `IconRegistry` pack. |
| [`@ui-kitten/moment`](https://www.npmjs.com/package/@ui-kitten/moment) | `moment` date service for Calendar and Datepicker. |
| [`@ui-kitten/date-fns`](https://www.npmjs.com/package/@ui-kitten/date-fns) | `date-fns` date service for Calendar and Datepicker. |
| [`@ui-kitten/metro-config`](https://www.npmjs.com/package/@ui-kitten/metro-config) | Metro plugin that precompiles Eva mappings at build time. |
| [`@ui-kitten/processor`](https://www.npmjs.com/package/@ui-kitten/processor) | Mapping processor. Replaces `@eva-design/dss` and `@eva-design/processor`. |
| [`@ui-kitten/mapping-base`](https://www.npmjs.com/package/@ui-kitten/mapping-base) | Shared mapping schema used by `eva` and `material`. |
| [`@ui-kitten/codemod`](https://www.npmjs.com/package/@ui-kitten/codemod) | Rewrites a v5 app for v6 and reports what it could not touch. |

## Migrating from v5

Package names, component names and props are unchanged. The breaking changes are the move from class to function components (ref types), the removal of the `styled` decorator in favour of `useStyled`, and enforced peer dependencies.

```sh
npx @ui-kitten/codemod          # dry run, nothing is written
npx @ui-kitten/codemod --write  # apply
```

The codemod rewrites the mechanical parts and leaves a report of what it could not touch. The [migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6) lists every change with a fix.

## Links

- [Documentation](https://akveo.github.io/react-native-ui-kitten) — guides, design system reference and a page per component.
- [GitHub](https://github.com/akveo/react-native-ui-kitten) — source, issues and discussions.
- [Eva Design System](https://eva.design) — the specification the mappings implement.

## License

[MIT](https://github.com/akveo/react-native-ui-kitten/blob/master/LICENSE.txt). UI Kitten was created by the [Akveo](https://www.akveo.com) team; the v6 rewrite and current maintenance are by [Vlad Bataev](https://github.com/bataevvlad) and the UI Kitten contributors.
