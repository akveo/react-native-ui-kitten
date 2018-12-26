import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  waitForElement,
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  ThemeProvider,
  withStyles,
  ThemeType,
} from '../component';
import { getThemeValue } from '../service';
import {
  theme,
  themeInverse,
} from './config';

describe('@theme: service method checks', () => {

  it('finds theme value properly', async () => {
    const themeValue = getThemeValue('grayPrimary', theme);
    const undefinedValue = getThemeValue('undefined', theme);

    expect(themeValue).toEqual(theme.grayPrimary);
    expect(undefinedValue).toBeUndefined();
  });

});

describe('@theme: ui component checks', () => {

  const themeConsumerTestId = '@theme/consumer';
  const themeChangeTouchableTestId = '@theme/btnChangeTheme';

  const json = (object: any) => JSON.stringify(object);

  class ComponentMock extends React.Component<any> {
    static defaultProps = {
      testID: themeConsumerTestId,
    };

    render() {
      return (
        <View testID={this.props.testID}/>
      );
    }
  }

  interface ActionMockProps {
    theme: ThemeType;
    themeInverse: ThemeType;
  }

  class ActionMock extends React.Component<ActionMockProps> {

    state = {
      theme: undefined,
    };

    constructor(props) {
      super(props);
      this.state.theme = this.props.theme;
    }

    onThemeChangeTouchablePress = () => {
      this.setState({
        theme: this.props.themeInverse,
      });
    };

    render() {
      const ThemedComponent = withStyles(ComponentMock);
      return (
        <View>
          <ThemeProvider theme={this.state.theme}>
            <ThemedComponent/>
          </ThemeProvider>
          <TouchableOpacity
            testID={themeChangeTouchableTestId}
            onPress={this.onThemeChangeTouchablePress}
          />
        </View>
      );
    }
  }

  interface OverrideMockProps {
    theme: ThemeType;
    themeInverse: ThemeType;
  }

  class OverrideMock extends React.Component<OverrideMockProps> {

    render() {
      const ThemedComponent1 = withStyles(ComponentMock);
      const ThemedComponent2 = withStyles(ComponentMock);
      return (
        <ThemeProvider theme={this.props.theme}>
          <ThemedComponent1/>
          <ThemeProvider theme={this.props.themeInverse}>
            <ThemedComponent2/>
          </ThemeProvider>
        </ThemeProvider>
      );
    }
  }

  it('static methods are copied over', async () => {
    // @ts-ignore: test-case
    ComponentMock.staticMethod = function () {
    };
    const ThemedComponent = withStyles(ComponentMock);

    // @ts-ignore: test-case
    expect(ThemedComponent.staticMethod).not.toBeUndefined();
  });

  it('receives custom props', async () => {
    const ThemedComponent = withStyles(ComponentMock, (value: ThemeType) => ({
      container: {
        backgroundColor: value.grayPrimary,
      },
    }));

    const component = render(
      <ThemeProvider theme={theme}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);

    expect(json(themedComponent.props.theme)).toEqual(json(theme));
    expect(themedComponent.props.themedStyle.container.backgroundColor).toEqual(theme.grayPrimary);
    expect(themedComponent.props.themedStyle).not.toBeNull();
    expect(themedComponent.props.themedStyle).not.toBeUndefined();
  });

  it('able to change theme', async () => {
    const component = render(
      <ActionMock
        theme={theme}
        themeInverse={themeInverse}
      />,
    );

    const touchableComponent = component.getByTestId(themeChangeTouchableTestId);

    fireEvent.press(touchableComponent);

    const themedComponent = await waitForElement(() => {
      return component.getByTestId(themeConsumerTestId);
    });

    expect(json(themedComponent.props.theme)).toEqual(json(themeInverse));
  });

  it('able to override theme', async () => {
    const component = render(
      <OverrideMock
        theme={theme}
        themeInverse={themeInverse}
      />,
    );

    const themedComponents = component.getAllByName(ComponentMock);

    expect(themedComponents.length).toBeGreaterThan(1);

    const theme1 = themedComponents[0].props.theme;
    const theme2 = themedComponents[1].props.theme;

    expect(theme1).not.toEqual(theme2);
    expect(json(theme1)).toEqual(json(theme));
    expect(json(theme2)).toEqual(json(themeInverse));
  });

});
