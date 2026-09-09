---
id: 5x-to-6
title: 5.x - 6.0.0 Migration
sidebar_label: 5.x to 6.0.0 Migration
description: Migration process and breaking changes in UI Kitten 6.0.0.
keywords:
  - React Native
  - UI Kitten
  - migration
  - version 6
---

# 5.x - 6.0.0 Migration

UI Kitten v6 is a platform and packaging release rather than an API redesign. Every component keeps its name and its properties. What changed is underneath: all components are now function components, the library is built as ECMAScript modules, it ships generated type definitions, and it no longer depends on the `@eva-design` packages.

There is exactly one breaking change to the public API surface — the `styled` higher-order function. Everything else on this page is about packaging: how the library is resolved, typechecked, and transformed by your tooling.

v6 is currently published under the `beta` dist-tag. `latest` still points at `5.3.1`, so every install command below is explicit about the tag.

### Migration Purposes

- React 19, React Native 0.81+ and the New Architecture;
- A modern ESM build with a declared `exports` map;
- Generated type definitions, so consuming projects no longer typecheck the library's source;
- First-party Eva packages, removing the `@eva-design` dependency chain.

---

## Summary

| What changed | Breaking | Fix |
| --- | --- | --- |
| Packages must be installed with the `@beta` tag | Yes | `npm i @ui-kitten/components@beta @ui-kitten/eva@beta` |
| Jest cannot parse the package out of the box | Yes | Add `@ui-kitten` to `transformIgnorePatterns` |
| `styled` was removed | Yes | Use the `useStyled` hook |
| Deep imports such as `@ui-kitten/components/ui/...` no longer resolve | Yes | Import from the package root or from `@ui-kitten/components/devsupport` |
| `react`, `react-native` and `react-native-svg` are enforced peer dependencies | Yes, if you are below the minimums | Upgrade to `react >=18.2.0`, `react-native >=0.72.0`, `react-native-svg >=13.0.0` |
| `@eva-design/dss` and `@eva-design/processor` replaced by `@ui-kitten/mapping-base` and `@ui-kitten/processor` | Only if you imported them directly | Import the equivalents from the `@ui-kitten` scope |
| `types` now points at generated `.d.ts` instead of source | No — this fixes a bug | Upgrade from `6.0.0-beta.1` to `6.0.0-beta.2` |
| Button, Select and Datepicker text properties accept `string` and `number` | No | Nothing; `<Button>TEXT</Button>` now typechecks |
| `AutocompleteRef`, `InputRef` and `ListRef` are exported | No | Nothing |
| `React.ReactText` replaced with `string \| number` | No | Nothing |

---

## What did not change

Before going through the list above, it is worth being clear about what you do *not* have to touch:

- The `@ui-kitten` scope. Package names are the same as in v5.
- Every component name and every component property. There were no renames.
- Eva Design System concepts — mappings, themes, appearances, variants and states all work as before.
- `ApplicationProvider` and how you pass a mapping and a theme to it.
- `withStyles`, `useTheme`, `useStyleSheet`, `StyleService` and `ThemeProvider`.
- `@eva-design/eva` still works as a mapping source. `@ui-kitten/eva` is the maintained one and what the documentation uses, but existing code that spreads `@eva-design/eva` into `ApplicationProvider` keeps working.

The only symbol removed from the package root between `5.3.1` and `6.0.0-beta.2` is `styled`.

---

## Update UI Kitten

```bash
npm i @ui-kitten/components@beta @ui-kitten/eva@beta

// Using Yarn?
yarn add @ui-kitten/components@beta @ui-kitten/eva@beta
```

Additionally, if you use any other UI Kitten packages, they all publish under the same tag:

```bash
npm i @ui-kitten/eva-icons@beta @ui-kitten/moment@beta @ui-kitten/date-fns@beta
npm i -D @ui-kitten/metro-config@beta
```

:::warning
Do not omit `@beta`. `@ui-kitten/components@latest` is still `5.3.1`, while `@ui-kitten/eva` only exists as `6.0.0-beta.1` — installing without the tag gives you a v5 library next to a v6 mapping package.
:::

---

## Update peer dependencies

v5 declared a single loose peer dependency, `react-native-svg: '*'`. v6 declares three and npm will warn if your project does not satisfy them.

Before:

```json
"peerDependencies": {
  "react-native-svg": "*"
}
```

After:

```json
"peerDependencies": {
  "react": ">=18.2.0",
  "react-native": ">=0.72.0",
  "react-native-svg": ">=13.0.0"
}
```

These are the minimums the package refuses to install quietly below — not the versions it is developed against. v6 is built and tested on React 19.1, React Native 0.81 and Expo 54, and has been verified to bundle and run on Expo 57 with React Native 0.86.

---

## Configure Jest

This is the change most projects hit first, and it is worth understanding rather than pasting past.

v6 is built as ECMAScript modules, and its `exports` map declares a `react-native` condition that points at the TypeScript source. Metro and Jest both select that condition, so Jest is handed a `.ts` file inside `node_modules` — which it does not transform by default:

```
node_modules/@ui-kitten/components/index.ts:1
({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){export * from './theme';
                                                                                  ^^^^^^
SyntaxError: Unexpected token 'export'
```

The fix is to let `@ui-kitten` through `transformIgnorePatterns`. Your Babel configuration already handles the rest.

With `preset: 'react-native'`, before:

```js
module.exports = {
  preset: 'react-native',
};
```

After:

```js
module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@ui-kitten)/)',
  ],
};
```

With `preset: 'jest-expo'`, the preset's own list has to be repeated because Jest replaces the array rather than merging it. Add `|@ui-kitten` at the end of the first pattern:

```js
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|standard-navigation|@ui-kitten))',
    '/node_modules/react-native-reanimated/plugin/',
    '/node_modules/@react-native/babel-preset/',
  ],
};
```

:::note
If you already listed `@ui-kitten` in `transformIgnorePatterns` for v5, you need no change. v5 shipped untranspiled JSX in its CommonJS output, so it required the same allowance for a different reason.
:::

Metro itself needs no configuration. A v6 app bundles with no `exports` warnings and no additional setup.

---

## Migrate from `styled` to `useStyled`

The `styled` higher-order function is no longer exported. Custom components that were connected to an Eva mapping now call the `useStyled` hook directly, which removes the wrapper component and the injected `eva` prop.

Before:

```js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled } from '@ui-kitten/components';

const CircleButton = styled('CircleButton')((props) => {
  const { eva, style, ...restProps } = props;
  return (
    <TouchableOpacity style={[eva.style, style]} {...restProps} />
  );
});

export { CircleButton };
```

After:

```js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useStyled } from '@ui-kitten/components';

const CircleButton = (props) => {
  const { appearance, style, ...restProps } = props;
  const { style: evaStyle } = useStyled('CircleButton', { appearance });

  return (
    <TouchableOpacity style={[evaStyle, style]} {...restProps} />
  );
};

export { CircleButton };
```

Interaction states move from `eva.dispatch` to the `dispatch` returned by the hook.

Before:

```js
import { styled, Interaction } from '@ui-kitten/components';

const CircleButton = styled('CircleButton')((props) => {
  const { eva, style, ...restProps } = props;

  return (
    <TouchableOpacity
      {...restProps}
      activeOpacity={1.0}
      style={[eva.style, style]}
      onPressIn={() => eva.dispatch([Interaction.ACTIVE])}
      onPressOut={() => eva.dispatch([])}
    />
  );
});
```

After:

```js
import { useStyled, Interaction } from '@ui-kitten/components';

const CircleButton = (props) => {
  const { style, ...restProps } = props;
  const { style: evaStyle, dispatch } = useStyled('CircleButton');

  return (
    <TouchableOpacity
      {...restProps}
      activeOpacity={1.0}
      style={[evaStyle, style]}
      onPressIn={() => dispatch([Interaction.ACTIVE])}
      onPressOut={() => dispatch([])}
    />
  );
};
```

The semantic properties that used to be read off the wrapper's props — `appearance`, `status`, `size`, `disabled`, `checked` and the rest — are now passed to the hook explicitly as its second argument. See [Using Mapping](/docs/components/styled) for the full list.

`StyledComponentProps` and `EvaProp` are still exported as types, so existing type annotations continue to compile.

---

## Replace deep imports

v5 published no `exports` map, so any file inside the package could be imported directly. v6 declares one, and only two entry points are public.

Before:

```js
import { Button } from '@ui-kitten/components/ui/button/button.component';
import { RenderProp } from '@ui-kitten/components/devsupport/typings';
```

After:

```js
import { Button } from '@ui-kitten/components';
import { RenderProp } from '@ui-kitten/components/devsupport';
```

Anything else now fails to resolve with `ERR_PACKAGE_PATH_NOT_EXPORTED` under Node, or `MODULE_NOT_FOUND` under the Jest resolver.

:::note
If you import from `@ui-kitten/components/devsupport` in a TypeScript project, use `"moduleResolution": "bundler"`. Under the legacy `"node"` resolution TypeScript ignores the `exports` map, resolves the subpath to the package's own source, and reports errors from files that expect the `dom` library.
:::

---

## Eva dependencies

`@eva-design/dss` and `@eva-design/processor` were replaced by `@ui-kitten/mapping-base` and `@ui-kitten/processor`, and `lodash.merge` was dropped. This is transparent unless you imported those packages yourself.

Before:

```js
import { SchemaType } from '@eva-design/dss';
import { createTheme } from '@eva-design/processor';
```

After:

```js
import { SchemaType } from '@ui-kitten/mapping-base';
import { createTheme } from '@ui-kitten/processor';
```

The mapping format is unchanged, which is why `@eva-design/eva` remains a valid mapping source. If you use `@ui-kitten/metro-config` to process mappings at build time, `evaPackage` accepts either name.

---

## Generated type definitions

In v5 and in `6.0.0-beta.1`, the `types` field pointed at the library's own `index.ts`. Consuming projects typechecked UI Kitten's source under their own `tsconfig.json` and saw errors coming out of `node_modules` that `skipLibCheck` could not suppress, because it only skips `.d.ts` files.

`6.0.0-beta.2` builds real declarations and points `types` at `./lib/typescript/index.d.ts`. If you are on `6.0.0-beta.1`, upgrade — there is no workaround on that version.

---

## Improvements you get for free

**Text properties accept strings and numbers.** `Button`, `Select` and `Datepicker` now type their text properties the same way `CheckBox`, `Toggle` and `Radio` always did. The idiomatic form did not typecheck before:

```js
import { Button, Select } from '@ui-kitten/components';

<Button>TEXT</Button>
<Button>{42}</Button>
<Select label='Label' placeholder='Select Option' value='Option 1' />
```

**Ref types are exported.** `AutocompleteRef`, `InputRef` and `ListRef` join the already-exported `CalendarRef`, `DatepickerRef`, `IconRef`, `RangeCalendarRef`, `RangeDatepickerRef` and `SelectRef`. There was previously no way to type these refs:

```js
import { useRef } from 'react';
import { Input, InputRef } from '@ui-kitten/components';

const inputRef = useRef<InputRef>(null);

<Input ref={inputRef} />
```

**React 19 cleanups.** `React.ReactText` was removed in React 19 and is replaced with `string | number` throughout the public API. Several properties were also corrected while generating declarations: `Calendar`'s `getViewMode()` is typed `CalendarViewMode` rather than `string`, `TabView`'s pager ref is typed `ViewPagerRef`, `DatepickerProps` no longer declares conflicting `onBlur` and `onFocus`, and `dateService` accepts `NativeDateService | DateService<D>`.

**New theming exports.** `useThemeValue`, `useThemeValues`, `ThemeStore`, `ThemeStoreContext`, `styleCache`, `StyleCacheClass`, `useStyledDefaultProps` and `usePopoverMeasurement` are now public.

---

## Known gaps

- v6 is a beta. There is no `latest` release. The `@ui-kitten/template-js` and `@ui-kitten/template-ts` starter templates have been retired — the versions still on npm install React Native 0.70 and UI Kitten 5.3.1 and should not be used. Start from [Getting Started](/docs/guides/getting-started#new-apps) instead.
- New Architecture support is claimed on the basis that the library contains no native modules and no legacy bridge usage. It has not been verified against a Fabric build in this documentation pass.
- The library is developed against React Native 0.81 and Expo 54. Newer versions are known to bundle and run, but only the declared peer-dependency minimums are guaranteed.

---

## Related Articles

- [4.x to 5.0.0 Migration](/docs/migration/4x-to-5)
- [Using Mapping](/docs/components/styled)
- [Getting Started](/docs/guides/getting-started)
