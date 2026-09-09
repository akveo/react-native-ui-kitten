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

UI Kitten v6 is a platform and packaging release rather than an API redesign. Every component keeps its name and its properties. What changed is underneath: all components except five are now function components, the library is built as ECMAScript modules, it ships generated type definitions, and it no longer depends on the `@eva-design` packages.

Exactly one name left the public export surface — the `styled` higher-order function. The change most v5 apps actually trip over is a consequence of the function-component rewrite: a component name no longer doubles as its ref type, so `useRef<Input>()` is a compile error. Everything else on this page is about packaging: how the library is resolved, typechecked, and transformed by your tooling.

v6 is currently published under the `beta` dist-tag. `latest` still points at `5.3.1`, so every install command below is explicit about the tag.

Most of this page can be done for you:

```sh
npx @ui-kitten/codemod          # dry run — nothing is written
npx @ui-kitten/codemod --write  # apply
```

The codemod leaves a report naming everything it refused to change and why. The sections below are what that report links to.

:::note
`@ui-kitten/codemod` is currently private to the UI Kitten repository. Until it is published, run it from a checkout: `node src/codemod/bin/ui-kitten-codemod <path-to-your-app>`.
:::

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
| Component names are no longer valid ref types | Yes, if you hold a ref | Use the exported `*Ref` types, or `React.ComponentRef<typeof X>` |
| `useRef()` with no initial value, `createRef` under `strictNullChecks` | Yes, on React 19 typings | `useRef<T>(null)`; annotate `createRef` results `RefObject<T \| null>` |
| `styled` was removed | Yes | Use the `useStyled` hook |
| Deep imports such as `@ui-kitten/components/ui/...` no longer resolve | Yes | Import from the package root or from `@ui-kitten/components/devsupport` |
| `react`, `react-native` and `react-native-svg` are enforced peer dependencies | Yes, if you are below the minimums | Upgrade to `react >=18.2.0`, `react-native >=0.72.0`, `react-native-svg >=13.0.0` |
| `@ui-kitten/metro-config` accepts only `@ui-kitten/eva` and `@ui-kitten/material` | Yes, if you use build-time styles | Set `evaPackage: '@ui-kitten/eva'` |
| `@eva-design/dss` and `@eva-design/processor` replaced by `@ui-kitten/processor` | Only if you imported them directly | Import the same names from `@ui-kitten/processor` |
| `lodash.merge` is no longer a transitive dependency | Only if you imported it directly | Add it to your own `dependencies` |
| `React.ReactText` was removed by React 19 | Only in your own type annotations | Replace with `string \| number` |
| `types` now points at generated `.d.ts` instead of source | No — this fixes a bug | Upgrade from `6.0.0-beta.1` to `6.0.0-beta.2` |
| Button, Select and Datepicker text properties accept `string` and `number` | No | Nothing; `<Button>TEXT</Button>` now typechecks |
| `AutocompleteRef`, `InputRef` and `ListRef` are exported | No | Nothing |

---

## What did not change

Before going through the list above, it is worth being clear about what you do *not* have to touch:

- The `@ui-kitten` scope. Package names are the same as in v5.
- Every component name and every component property. There were no renames.
- Eva Design System concepts — mappings, themes, appearances, variants and states all work as before.
- `ApplicationProvider` and how you pass a mapping and a theme to it.
- `withStyles`, `useTheme`, `useStyleSheet`, `StyleService` and `ThemeProvider`.
- `@eva-design/eva` still works as a mapping source at runtime. `@ui-kitten/eva` is the maintained one and what the documentation uses, but existing code that spreads `@eva-design/eva` into `ApplicationProvider` keeps working. See [@eva-design/eva](#eva-design-eva) for the one place it does not.

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

## Update dependencies {#dependencies}

The finished `package.json` looks like this:

```jsonc
{
  "dependencies": {
    "@ui-kitten/components": "^6.0.0-beta.2",
    "@ui-kitten/eva": "^6.0.0-beta.1",       // replaces @eva-design/eva
    "@ui-kitten/eva-icons": "^6.0.0-beta.1"
  }
}
```

`@eva-design/dss` and `@eva-design/processor` can go once nothing imports them.

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

These are the minimums the package refuses to install quietly below — not the versions it is developed against. v6 is built and tested on React 19.1, React Native 0.81 and Expo 54, and has been verified to bundle and run on Expo 57 with React Native 0.86. Install a matching `react-native-svg` yourself; on Expo use `npx expo install react-native-svg` so it tracks the SDK.

### lodash.merge is no longer transitive {#lodash-merge-is-no-longer-transitive}

v5's `@ui-kitten/components` depended on `lodash.merge`, so an app importing it directly resolved without ever declaring it. v6 dropped that dependency.

Nothing about the API changed — only who provides the package. If your own code has `import merge from 'lodash.merge'`, add `lodash.merge` (and `@types/lodash.merge` if you use TypeScript) to your own `dependencies`.

---

## Configure Jest {#jest-and-the-esm-only-build}

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

Add `@ui-kitten` to whatever allow-list your preset already uses rather than replacing the pattern wholesale — the entry is a *negative* filter, and dropping an existing alternative stops transforming a package you rely on.

:::note
If you already listed `@ui-kitten` in `transformIgnorePatterns` for v5, you need no change. v5 shipped untranspiled JSX in its CommonJS output, so it required the same allowance for a different reason.
:::

Metro itself needs no configuration. A v6 app bundles with no `exports` warnings and no additional setup.

---

## Ref types

In v5, every component was a class, so its name doubled as a type:

```tsx
const inputRef = React.useRef<Input>(null);
```

In v6 components are function components with separate ref interfaces, so the v5 form fails with
`TS2749: 'Input' refers to a value, but is being used as a type here`.

Nine ref types are exported from `@ui-kitten/components`:

| component | v6 ref type |
| --- | --- |
| `Autocomplete` | `AutocompleteRef` |
| `Input` | `InputRef` |
| `Select` | `SelectRef` |
| `Icon` | `IconRef` |
| `List` | `ListRef` |
| `Calendar` | `CalendarRef<D = Date>` |
| `RangeCalendar` | `RangeCalendarRef<D = Date>` |
| `Datepicker` | `DatepickerRef<D = Date>` |
| `RangeDatepicker` | `RangeDatepickerRef<D = Date>` |

```tsx
// v5
const inputRef = React.useRef<Input>(null);
const calendarRef = React.useRef<Calendar<Moment>>(null);
const iconRef = React.useRef<Icon<Partial<ImageProps>>>();

// v6
const inputRef = React.useRef<InputRef>(null);
const calendarRef = React.useRef<CalendarRef<Moment>>(null);
const iconRef = React.useRef<IconRef>(null);
```

Watch the third line. `Calendar` was generic in v5 and `CalendarRef` is generic in v6, so the type
argument carries across. `Icon` was generic in v5 but `IconRef` is **not**, so the argument has to
be dropped — and because v5's `Icon<T>` had no default type parameter, spelling the argument out was
the *only* valid v5 form. `List` and `ListRef` behave the same way.

### Ref types without an exported name

Ten components take a ref whose type you cannot import:

`Button`, `Divider`, `Layout`, `ListItem`, `MenuItem`, `Popover`, `SelectItem`, `TabBar`, `Text`,
`ViewPager`.

`Button` and the list items forward `TouchableWeb`, which lives behind the
`@ui-kitten/components/devsupport` subpath. `Text` forwards react-native's `Text`, which collides
with the UI Kitten `Text` you already import. `TabBar` and `ViewPager` forward `TabBarRef` and
`ViewPagerRef`, which v6 does not export.

Use `React.ComponentRef`, which needs no extra import:

```tsx
// v5
const pagerRef = React.useRef<ViewPager>(null);

// v6
const pagerRef = React.useRef<React.ComponentRef<typeof ViewPager>>(null);
```

`ComponentRef` requires `@types/react` 18.3 or newer. On older typings use the equivalent
`React.ElementRef`.

### Components that no longer accept a ref

These are plain function components in v6 and take no ref at all:

`ApplicationProvider`, `Avatar`, `BottomNavigation`, `BottomNavigationTab`, `ButtonGroup`, `Card`,
`CheckBox`, `CircularProgressBar`, `Drawer`, `DrawerItem`, `Menu`, `Modal`, `OverflowMenu`,
`ProgressBar`, `Radio`, `RadioGroup`, `Spinner`, `Tab`, `TabView`, `ThemeProvider`, `Toggle`,
`Tooltip`, `TopNavigation`, `TopNavigationAction`.

Passing one a `ref` is a type error. None of them exposed a public imperative method in v5 either,
so a ref on them was almost always decorative — but "almost always" is not a licence to delete it
for you, which is why the codemod reports these instead of rewriting them. Remove the ref, or drive
the component through its props.

### Components that are still classes

`AutocompleteItem`, `DrawerGroup`, `IconRegistry`, `MenuGroup` and `SelectGroup` are still classes
in v6, so `useRef<MenuGroup>()` is still valid. Nothing to do.

---

## useRef needs an initial value

React 19 removed the zero-argument `useRef` overload, so this is now
`TS2554: Expected 1 arguments, but got 0`:

```tsx
// v5
const ref = React.useRef<IconRef>();

// v6
const ref = React.useRef<IconRef>(null);
```

A bare `React.useRef()` with no type argument either is the same error, but there is nothing to
infer from — `useRef(null)` produces `RefObject<null>`, which no `ref` prop accepts. Give it the
ref type of whatever it is attached to.

---

## createRef and strictNullChecks

`React.createRef<T>()` returns `RefObject<T | null>`, so annotating the result `RefObject<T>` fails
under `strictNullChecks`, which every React Native tsconfig preset enables:

```tsx
// fails: Type 'RefObject<InputRef | null>' is not assignable to type 'RefObject<InputRef>'
const ref: React.RefObject<InputRef> = React.createRef();

// v6
const ref: React.RefObject<InputRef | null> = React.createRef();
```

---

## ReactText was removed

React 19 dropped the `ReactText` alias. It was exactly `string | number`:

```tsx
// v5
title: React.ReactText;

// v6
title: string | number;
```

Note that `ReactText[]` becomes `(string | number)[]` — the parentheses matter.

---

## Migrate from `styled` to `useStyled` {#the-styled-decorator-was-removed}

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

The same applies to the decorator form. Because `useStyled` is a hook, a decorated class has to become a function component first — that is a restructuring, not a substitution, which is why the codemod reports these instead of rewriting them:

```tsx
// v5 — no longer resolves
import { styled } from '@ui-kitten/components';

@styled('StyledComponent')
class StyledCard extends React.Component<StyledComponentProps> { … }
```

The semantic properties that used to be read off the wrapper's props — `appearance`, `status`, `size`, `disabled`, `checked` and the rest — are now passed to the hook explicitly as its second argument. See [Using Mapping](/docs/components/styled) for the full list.

`withStyles`, `StyledComponentProps` and `EvaProp` are unchanged and still exported, so existing type annotations continue to compile, and a class that only needs theme values can move to `withStyles` without becoming a function component.

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

## @eva-design/eva {#eva-design-eva}

**Short answer: it still works, but you should switch, and if you use
`@ui-kitten/metro-config` you must.**

v6 ships its own mapping package, `@ui-kitten/eva`. It is the same document:
`@eva-design/eva@2.2.0` and `@ui-kitten/eva@6.0.0-beta.1` have identical themes and identical
`mapping.json` files apart from the `$schema` pointer, which the style processor never reads. An app
that keeps importing `@eva-design/eva` renders identically under v6 — this is pinned by a test in
the UI Kitten repository.

```tsx
// works, but unsupported
import * as eva from '@eva-design/eva';

// v6
import * as eva from '@ui-kitten/eva';
```

The exception is build-time styles. `@ui-kitten/metro-config@6` accepts only `@ui-kitten/eva` and
`@ui-kitten/material`; given anything else it warns and stops generating styles, so your app
silently falls back to runtime processing.

```js
// metro.config.js — this one is required
const evaConfig = {
  evaPackage: '@ui-kitten/eva',
};
```

The same applies to a `ui-kitten bootstrap @eva-design/eva` script in your `package.json`.

---

## @eva-design/dss moved {#eva-design-dss-moved}

`@eva-design/dss` contained only type declarations — it has no runtime exports at all. v6 re-exports
the same 19 names from `@ui-kitten/processor`:

```tsx
// v5
import { ThemeStyleType, SchemaType } from '@eva-design/dss';

// v6
import type { ThemeStyleType, SchemaType } from '@ui-kitten/processor';
```

`ThemeType` is **not** part of this move — it comes from `@ui-kitten/components` in both versions.

---

## @eva-design/processor moved {#eva-design-processor-moved}

```tsx
// v5
import { SchemaProcessor } from '@eva-design/processor';

// v6
import { SchemaProcessor } from '@ui-kitten/processor';
```

`@ui-kitten/processor` is a strict superset: it adds `clearProcessorCache` and
`getProcessorCacheStats`.

---

## Metro config evaPackage

See [@eva-design/eva](#eva-design-eva). This is the one place the old mapping package genuinely
stops working.

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

:::note
This is not a change you need to act on. v5 already typed those props as `React.ReactText`, which *was* `string | number`; the only difference is that `TextElement` joined the union. If you wrapped a bare string in `<Text>` somewhere, it was not to satisfy these types, and you can leave it alone.
:::

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
