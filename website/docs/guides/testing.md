---
id: testing
title: Testing with Jest
sidebar_label: Testing with Jest
description: How to configure Jest so it can load UI Kitten packages.
keywords:
  - React Native
  - UI Kitten
  - Jest
  - Testing
---

# Testing with Jest

UI Kitten ships as ES modules, and Metro resolves `@ui-kitten/components` to its TypeScript
source. Jest does neither by default: it ignores `node_modules` when transforming, so the first
test that imports UI Kitten fails before it runs.

```
● Test suite failed to run

  .../node_modules/@ui-kitten/components/index.ts:1
  export * from './theme';
  ^^^^^^

  SyntaxError: Unexpected token 'export'
```

The fix is one line of Jest config: allow `@ui-kitten` through the transform.

---

## Expo projects

Add `@ui-kitten/.*` to the end of the `jest-expo` `transformIgnorePatterns` group. The pattern is
a negative lookahead, so every package listed inside it **is** transformed.

```json
{
  "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@ui-kitten/.*)"
    ]
  }
}
```

## Bare React Native projects

```json
{
  "jest": {
    "preset": "react-native",
    "transformIgnorePatterns": [
      "node_modules/(?!(@?react-native|react-native-svg|@ui-kitten)/)"
    ]
  }
}
```

---

## Verifying the setup

A test that touches all four kinds of package — mappings, components, the `devsupport`
subpath and a date adapter — proves the transform is wired correctly:

```tsx
import * as eva from '@ui-kitten/eva';
import { ApplicationProvider, Button, IndexPath, NativeDateService } from '@ui-kitten/components';
import { Frame } from '@ui-kitten/components/devsupport';
import { MomentDateService } from '@ui-kitten/moment';

test('UI Kitten loads under Jest', () => {
  expect(eva.mapping).toBeTruthy();
  expect(typeof ApplicationProvider).toBe('function');
  expect(Button).toBeTruthy();
  expect(new IndexPath(1).row).toBe(1);
  expect(new NativeDateService('en').getId()).toBe('native');
  expect(new Frame(1, 2, 3, 4).size.width).toBe(3);
  expect(new MomentDateService().getId()).toBe('moment');
});
```

---

## Notes

- `Button`, `Text`, `Input` and the other components are `forwardRef` results, so they are objects
  rather than functions. Assert with `toBeTruthy()`, not `typeof x === 'function'`.
- `EvaIconsPack.icons` is a `Proxy` that resolves icons on access. `Object.keys()` on it returns
  an empty array by design — read icons by name (`EvaIconsPack.icons.star`) instead of enumerating.
- Overlay components (`Modal`, `Popover`, `Tooltip`, `Select`, `Datepicker`, `OverflowMenu`)
  measure their anchor through `UIManager.measureInWindow`. Under `@testing-library/react-native`
  you need to mock it, otherwise they render with a zero-sized frame:

  ```ts
  jest.mock('react-native/Libraries/ReactNative/UIManager', () => ({
    ...jest.requireActual('react-native/Libraries/ReactNative/UIManager'),
    measureInWindow: (node, callback) => callback(0, 0, 320, 44),
  }));
  ```
