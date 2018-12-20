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
  StyleType,
} from '../component';
import { getThemeValue } from '../service';

describe('@theme: service method checks', () => {

  it('finds theme value properly', async () => {
    const themeValue = getThemeValue('backgroundColorTestDefault', config.theme);
    const undefinedValue = getThemeValue('undefined', config.theme);

    expect(themeValue).toEqual(config.values.backgroundDefault);
    expect(undefinedValue).toBeUndefined();
  });

});

describe('@theme: ui component checks', () => {

  const themeConsumerTestId = '@theme/consumer';
  const themeChangeTouchableTestId = '@theme/btnChangeTheme';

  class ThemedConsumer extends React.Component<any> {
    static defaultProps = {
      testID: themeConsumerTestId,
    };

    render() {
      return (
        <View testID={this.props.testID}/>
      );
    }
  }

  class ThemedStyleConsumer extends React.Component<any> {
    static defaultProps = {
      testID: themeConsumerTestId,
    };

    render() {
      return (
        <View
          testID={this.props.testID}
          style={this.props.themedStyle.container}
        />
      );
    }
  }

  class ActionedProvider extends React.Component<any> {

    static initialThemeColor = '#ffffff';
    static onChangeThemeColor = '#000000';

    state = {
      theme: {
        backgroundColor: ActionedProvider.initialThemeColor,
      },
    };

    isInitialColor = (color: string): boolean => color === ActionedProvider.initialThemeColor;

    getInversedColor = (color: string): string => {
      const isInitialColor = this.isInitialColor(color);
      return isInitialColor ? ActionedProvider.onChangeThemeColor : ActionedProvider.initialThemeColor;
    };

    onThemeChangeTouchablePress = () => {
      this.setState({
        theme: {
          backgroundColor: this.getInversedColor(this.state.theme.backgroundColor),
        },
      });
    };

    render() {
      const ThemedComponent = withStyles(ThemedConsumer);
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

  class ThemedStyleProvider extends React.Component<any> {

    createThemedComponent1Styles = (theme: ThemeType) => ({
      container: {
        backgroundColor: theme.color,
      },
    });

    createThemedComponent2Styles = (theme: ThemeType) => ({
      container: {
        backgroundColor: theme.color,
      },
    });

    render() {
      const ThemedComponent1 = withStyles(ThemedStyleConsumer, this.createThemedComponent1Styles);
      const ThemedComponent2 = withStyles(ThemedStyleConsumer, this.createThemedComponent2Styles);
      return (
        <ThemeProvider theme={this.props.theme1}>
          <ThemedComponent1/>
          <ThemeProvider theme={this.props.theme2}>
            <ThemedComponent2/>
          </ThemeProvider>
        </ThemeProvider>
      );
    }
  }

  it('static methods are copied over', async () => {
    // @ts-ignore: test-case
    ThemedConsumer.staticMethod = function () {
    };
    const ThemedComponent = withStyles(ThemedConsumer);

    // @ts-ignore: test-case
    expect(ThemedComponent.staticMethod).not.toBeUndefined();
  });

});

describe('@theme: ui component checks', () => {

  it('receives custom props', async () => {
    const ThemedComponent = withStyles(ComponentMock, createThemedStyleMock);

    const component = render(
      <ThemeProvider theme={config.theme}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);

    expect(JSON.stringify(themedComponent.props.theme)).toEqual(JSON.stringify(config.theme));
    expect(themedComponent.props.themedStyle).not.toBeNull();
    expect(themedComponent.props.themedStyle).not.toBeUndefined();
    expect(themedComponent.props.themedStyle.color).toEqual(config.theme.backgroundColorTestDefault);
  });

  it('static methods are copied over', async () => {
    // @ts-ignore: test-case
    ComponentMock.staticMethod = function () {
    };
    const ThemedComponent = withStyles(ComponentMock);

    // @ts-ignore: test-case
    expect(ThemedComponent.staticMethod).not.toBeUndefined();
  });

  it('able to change theme', async () => {
    const component = render(
      <ActionMock
        theme1={config.theme}
        theme2={config.themeInverse}
      />,
    );

    const touchableComponent = component.getByTestId(themeChangeTouchableTestId);

    fireEvent.press(touchableComponent);

    const themedComponent = await waitForElement(() => {
      return component.getByTestId(themeConsumerTestId);
    });

    expect(JSON.stringify(themedComponent.props.theme)).toEqual(JSON.stringify(config.themeInverse));
  });

  it('able to override theme', async () => {
    const component = render(
      <OverrideMock
        theme1={config.theme}
        theme2={config.themeInverse}
        createStyle={createThemedStyleMock}
      />,
    );

    const themedComponents = component.getAllByName(ComponentMock);

    expect(themedComponents.length).toBeGreaterThan(1);

    const themedComponent1Color = themedComponents[0].props.themedStyle.container.backgroundColor;
    const themedComponent2Color = themedComponents[1].props.themedStyle.container.backgroundColor;

    expect(themedComponent1Color).not.toEqual(themedComponent2Color);
  });

});
