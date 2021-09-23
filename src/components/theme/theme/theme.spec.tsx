/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitForElement,
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
  const themeChangeTouchableTestId: string = '@theme/btnChangeTheme';

  const Sample = (props) => (
    <View
      {...props}
      testID={themeConsumerTestId}
    />
  );

  const ThemeChangingComponent = (props: { theme: ThemeType, themeInverse: ThemeType }) => {
    const [currentTheme, setCurrentTheme] = React.useState(props.theme);

    const ThemedComponent = withStyles(Sample);

    return (
      <React.Fragment>
        <ThemeProvider theme={currentTheme}>
          <ThemedComponent/>
        </ThemeProvider>
        <TouchableOpacity
          testID={themeChangeTouchableTestId}
          onPress={() => setCurrentTheme(props.themeInverse)}
        />
      </React.Fragment>
    );
  };

  it('withStyles component should not re-renderer because of parent render', async () => {
    const rerenderButtonText = 'Rerender parent';
    const getRenderCountText = (elementType: string, count: number) => {
      return `${elementType}: render for ${count} ${count === 1 ? 'time' : 'times'}`;
    };

    const ChildComponent = React.memo(() => {
      const counter = useRef(0);
      counter.current++;
      return (
        <Text>{getRenderCountText('Child', counter.current)}</Text>
      );
    });

    const ChildComponentWithStyles = withStyles(ChildComponent);

    const ParentComponent = () => {
      const [renderCount, setRenderCount] = useState(1);
      return <View>
        <TouchableOpacity onPress={() => setRenderCount(renderCount + 1)}>
          <Text>{rerenderButtonText}</Text>
        </TouchableOpacity>
        <Text>{getRenderCountText('Parent', renderCount)}</Text>
        <ChildComponentWithStyles />
      </View>;
    };

    const renderedComponent: RenderAPI = render(
      <ThemeProvider theme={theme}>
        <ParentComponent />
      </ThemeProvider>,
    );

    fireEvent.press(renderedComponent.getByText(rerenderButtonText));

    expect(renderedComponent.queryByText(getRenderCountText('Parent', 2))).toBeTruthy();
    expect(renderedComponent.queryByText(getRenderCountText('Child', 1))).toBeTruthy();
  });

  it('static methods are copied over', () => {
    // @ts-ignore: test-case
    Sample.staticMethod = function () {
    };
    const ThemedComponent = withStyles(Sample);

    // @ts-ignore: test-case
    expect(ThemedComponent.staticMethod).not.toBeFalsy();
  });

  it('receives compiled theme', () => {
    const ThemedComponent = withStyles(Sample);

    const component: RenderAPI = render(
      <ThemeProvider theme={theme}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent: ReactTestInstance = component.getByTestId(themeConsumerTestId);

    expect(themedComponent.props.eva.theme).toEqual({
      defaultColor: '#000000',
      disabledColor: '#646464',
      activeColor: '#3366FF',
      refValue: '#000000',
      doubleRefValue: '#000000',
    });
  });

  it('receives custom theme', () => {
    const ThemedComponent = withStyles(Sample);

    const component: RenderAPI = render(
      <ThemeProvider theme={{
        ...theme,
        defaultColor: '#ffffff',
      }}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent: ReactTestInstance = component.getByTestId(themeConsumerTestId);

    expect(themedComponent.props.eva.theme).toEqual({
      defaultColor: '#ffffff',
      disabledColor: '#646464',
      activeColor: '#3366FF',
      refValue: '#ffffff',
      doubleRefValue: '#ffffff',
    });
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

  it('receives new theme when it is changed', async () => {
    const component: RenderAPI = render(
      <ThemeChangingComponent
        theme={theme}
        themeInverse={{
          ...theme,
          defaultColor: '#ffffff',
        }}
      />,
    );

    const touchableComponent: ReactTestInstance = component.getByTestId(themeChangeTouchableTestId);

    fireEvent.press(touchableComponent);

    const themedComponent: ReactTestInstance = await waitForElement(() => {
      return component.getByTestId(themeConsumerTestId);
    });

    expect(themedComponent.props.eva.theme.defaultColor).toEqual('#ffffff');
  });
});
