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
  GestureResponderEvent,
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
import { StyleProvider } from '../style/styleProvider.component';
import { mapping } from '@eva-design/eva';
import { ThemeStyleType } from '@eva-design/dss';

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

  const themeConsumerTestId = '@theme/consumer';
  const themeChangeTouchableTestId = '@theme/btnChangeTheme';

  const Sample = (props): React.ReactElement => (
    <View
      {...props}
      testID={themeConsumerTestId}
    />
  );

  const ThemeChangingComponent = (props: { theme: ThemeType; themeInverse: ThemeType }): React.ReactElement => {
    const [currentTheme, setCurrentTheme] = React.useState(props.theme);

    const ThemedComponent = withStyles(Sample);

    return (
      <>
        <ThemeProvider theme={currentTheme}>
          <ThemedComponent />
        </ThemeProvider>
        <TouchableOpacity
          testID={themeChangeTouchableTestId}
          onPress={() => setCurrentTheme(props.themeInverse)}
        />
      </>
    );
  };

  it('withStyles component should not re-renderer because of parent render', async () => {
    const rerenderButtonText = 'Rerender parent';
    const getRenderCountText = (elementType: string, count: number): string => {
      return `${elementType}: render for ${count} ${count === 1 ? 'time' : 'times'}`;
    };

    const ChildComponent = React.memo(() => {
      const counter = useRef(0);
      counter.current++;
      return (
        <Text>
          {getRenderCountText('Child', counter.current)}
        </Text>
      );
    });

    ChildComponent.displayName = 'ChildComponent';

    const ChildComponentWithStyles = withStyles(ChildComponent);

    const ParentComponent = (): React.ReactElement => {
      const [renderCount, setRenderCount] = useState(1);
      return (
        <View>
          <TouchableOpacity onPress={() => setRenderCount(renderCount + 1)}>
            <Text>
              {rerenderButtonText}
            </Text>
          </TouchableOpacity>
          <Text>
            {getRenderCountText('Parent', renderCount)}
          </Text>
          <ChildComponentWithStyles />
        </View>
      );
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
        <ThemedComponent />
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
      }}
      >
        <ThemedComponent />
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
        <ThemedComponent />
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

describe('@useTheme: rendering performance check', () => {

  interface IThemeChangingProvider {
    styles: ThemeStyleType;
    theme: ThemeType;
    onPress: (event: GestureResponderEvent) => void;
    value: string | number;
  }

  const styleTouchableTestId = '@style/touchable';
  const themes = {
    light: {
      defaultColor: 'white',
    },
    dark: {
      defaultColor: 'black',
    },
  };

  const ThemeChangingProvider = (props: IThemeChangingProvider): React.ReactElement => {
    return (
      <StyleProvider
        styles={props.styles}
        theme={props.theme}
      >
        <TouchableOpacity
          testID={styleTouchableTestId}
          onPress={props.onPress}
        >
          <Text style={{ color: theme.defaultColor }}>
            {`${props.value}`}
          </Text>
        </TouchableOpacity>
      </StyleProvider>
    );
  };

  it('changing theme should force new render', async () => {
    const themeFuncMock = jest.fn();

    const ChildComponent = (props): React.ReactElement => {
      React.useEffect(() => {
        themeFuncMock();
      });

      return <ThemeChangingProvider {...props} />;
    };

    const Component = (): React.ReactElement => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const [theme, setTheme] = React.useState<typeof themes['light']>(themes.dark);

      const changeTheme = (): void => {
        setTheme(theme.defaultColor === 'white' ? themes.dark : themes.light);
      };

      return (
        <ChildComponent
          styles={mapping}
          theme={theme}
          onPress={changeTheme}
          value={theme.defaultColor}
        />
      );
    };

    const component = render(<Component />);
    expect(themeFuncMock).toBeCalledTimes(1);
    fireEvent.press(component.getByTestId(styleTouchableTestId));
    expect(themeFuncMock).toBeCalledTimes(2);
  });

  it('not changing theme value state should not force component to render', async () => {
    const themeFuncMock = jest.fn();

    const ChildComponent = (props): React.ReactElement => {
      React.useEffect(() => {
        themeFuncMock();
      });

      return <ThemeChangingProvider {...props} />;
    };

    const Component = (): React.ReactElement => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const [theme, setTheme] = React.useState<typeof themes['light']>(themes.dark);

      const changeTheme = (): void => {
        setTheme(themes.dark);
      };

      return (
        <ChildComponent
          styles={mapping}
          theme={theme}
          onPress={changeTheme}
          value={theme.defaultColor}
        />
      );
    };

    const component = render(<Component />);
    expect(themeFuncMock).toBeCalledTimes(1);
    fireEvent.press(component.getByTestId(styleTouchableTestId));
    expect(themeFuncMock).toBeCalledTimes(1);
  });
});
