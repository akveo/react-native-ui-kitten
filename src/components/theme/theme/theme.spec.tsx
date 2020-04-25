/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import {
  render,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import { ThemeProvider } from './themeProvider.component';
import { withStyles } from './withStyles';
import {
  ThemeService,
  ThemeType,
} from './theme.service';

const theme = {
  defaultColor: '#000000',
  disabledColor: '#646464',
  activeColor: '#3366FF',
  refValue: '$defaultColor',
  doubleRefValue: '$refValue',
};

describe('@theme: service checks', () => {

  it('finds theme value properly', async () => {
    const themeValue = ThemeService.getValue('defaultColor', theme);
    const undefinedValue = ThemeService.getValue('undefined', theme);

    expect(themeValue).toEqual(theme.defaultColor);
    expect(undefinedValue).toBeFalsy();
  });

  it('finds referencing theme value properly', async () => {
    const themeValue = ThemeService.getValue('refValue', theme);
    expect(themeValue).toEqual(theme.defaultColor);
  });

  it('finds multiple referencing theme value properly', async () => {
    const themeValue = ThemeService.getValue('doubleRefValue', theme);
    expect(themeValue).toEqual(theme.defaultColor);
  });
});

describe('@theme: ui component checks', () => {

  const themeConsumerTestId: string = '@theme/consumer';

  const Sample = (props) => (
    <View
      {...props}
      testID={themeConsumerTestId}
    />
  );

  it('static methods are copied over', () => {
    // @ts-ignore: test-case
    Sample.staticMethod = function () {
    };
    const ThemedComponent = withStyles(Sample);

    // @ts-ignore: test-case
    expect(ThemedComponent.staticMethod).not.toBeFalsy();
  });

  it('receives style prop', () => {
    const ThemedComponent = withStyles(Sample, contextTheme => ({
      container: { backgroundColor: contextTheme.defaultColor },
    }));

    const component: RenderAPI = render(
      <ThemeProvider theme={theme}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent: ReactTestInstance = component.getByTestId(themeConsumerTestId);

    expect(themedComponent.props.eva.style).toEqual({
      container: { backgroundColor: '#000000' },
    });
  });
});
