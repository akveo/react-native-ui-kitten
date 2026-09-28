/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import {
  dark,
  EvaThemeKey,
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../application/applicationProvider.component';
import { useTheme } from './theme.service';
import { useThemeValue } from './useThemeValue';
import {
  ThemeKey,
  ThemeType,
} from './theme.service';
import { KnownThemeKey } from './themeKeys';

/*
 * Compile-time checks: `yarn typecheck:all` covers spec files, so a wrong type fails CI there;
 * the runtime assertions below only keep jest from reporting an empty suite.
 */
type IsKnown<K extends string> = K extends KnownThemeKey ? true : false;

const primaryIsKnown: IsKnown<'color-primary-500'> = true;
const hintIsKnown: IsKnown<'text-hint-color'> = true;
const customIsUnknown: IsKnown<'my-brand-color'> = false;

const evaKeyIsKnown: EvaThemeKey extends KnownThemeKey ? true : false = true;

const customKey: ThemeKey = 'my-brand-color';
const knownKey: ThemeKey = 'color-primary-500';

const themeWithCustomToken: ThemeType = { ...light, 'my-brand-color': '#123456' };
const knownValue: string = themeWithCustomToken['color-primary-500'];
const customValue: string = themeWithCustomToken['my-brand-color'];
const evaValue: string = light['color-primary-500'];
const evaDynamicValue: string = dark[customKey];

// @ts-expect-error a theme value is a string
const numberValue: ThemeType = { 'color-primary-500': 1 };

describe('@theme: typed tokens', () => {

  it('should keep the generated keys in sync with the Eva themes', () => {
    expect(Object.keys(light)).toEqual(Object.keys(dark));
    expect(light['color-primary-500']).toBeDefined();
    expect([primaryIsKnown, hintIsKnown, evaKeyIsKnown, customIsUnknown]).toEqual([true, true, true, false]);
    expect([knownKey, customKey, knownValue, customValue, evaValue, evaDynamicValue, numberValue]).toBeDefined();
  });

  it('should type useTheme and useThemeValue selectors with the known tokens', () => {
    const Probe = (): React.ReactElement => {
      const theme = useTheme();
      const primary: string = theme['color-primary-500'];
      const custom: string = theme['my-brand-color'];
      const selected: string = useThemeValue(current => current['text-basic-color']);
      return (
        <Text>
          {`${primary}|${custom}|${selected}`}
        </Text>
      );
    };

    const component = render(
      <ApplicationProvider
        mapping={mapping}
        theme={themeWithCustomToken}
      >
        <Probe />
      </ApplicationProvider>,
    );

    expect(component.queryByText(`${light['color-primary-500']}|#123456|${light['color-basic-800']}`)).toBeTruthy();
  });
});
