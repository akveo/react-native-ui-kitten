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
import { createStyle } from '../service';
import * as config from './config';

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

export class ThemedStyleProvider extends React.Component<any> {

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

describe('@theme: theme consumer checks', () => {

  it('renders properly', async () => {
    const ThemedComponent = withStyles(ThemedConsumer);

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent).not.toBeNull();
  });

  it('receives theme prop', async () => {
    const ThemedComponent = withStyles(ThemedConsumer);

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent.props.theme).not.toBeNull();
  });

  it('receives themedStyle prop', async () => {
    const ThemedComponent = withStyles(ThemedConsumer, (theme: ThemeType) => {
      return {};
    });

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent.props.themedStyle).not.toBeNull();
  });

  it('receives theme prop on theme change', async () => {
    const component = render(
      <ActionedProvider/>,
    );

    const touchableComponent = component.getByTestId(themeChangeTouchableTestId);

    fireEvent.press(touchableComponent);

    const themedComponent = await waitForElement(() => {
      return component.getByTestId(themeConsumerTestId);
    });

    expect(themedComponent.props.theme.backgroundColor).toEqual(ActionedProvider.onChangeThemeColor);
  });

  it('child theme provider overrides parent theme', async () => {
    const component = render(
      <ThemedStyleProvider
        theme1={{ color: '#3F51B5' }}
        theme2={{ color: '#009688' }}
      />,
    );

    const themedComponents = component.getAllByName(ThemedStyleConsumer);

    expect(themedComponents.length).toBeGreaterThan(1);

    const themedComponent1Color = themedComponents[0].props.themedStyle.container.backgroundColor;
    const themedComponent2Color = themedComponents[1].props.themedStyle.container.backgroundColor;

    expect(themedComponent1Color).not.toEqual(themedComponent2Color);
  });

  it('static methods are copied over', async () => {
    // @ts-ignore: test-case
    ThemedConsumer.staticMethod = function() {};
    const ThemedComponent = withStyles(ThemedConsumer);

    // @ts-ignore: test-case
    expect(ThemedComponent.staticMethod).not.toBeUndefined();
  });

});

describe('@theme: service methods checks', () => {

  it('default variant styled properly', async () => {
    const style = createStyle(config.theme, config.themeMappings.test);

    expect(style).not.toBeNull();
    expect(style).not.toBeUndefined();
    expect(style.backgroundColor).toEqual(config.values.backgroundDefault);
  });

  it('single non-default variant styled properly (string type)', async () => {
    const style = createStyle(config.theme, config.themeMappings.test, 'dark');

    expect(style.backgroundColor).toEqual(config.values.backgroundDark);
    expect(style.textColor).toEqual(config.values.textDefault);
  });

  it('list of non-default variants styled created properly (string type)', async () => {
    const style = createStyle(config.theme, config.themeMappings.test, 'dark success');

    expect(style.backgroundColor).toEqual(config.values.backgroundDark);
    expect(style.textColor).toEqual(config.values.textSuccess);
  });

  it('single non-default variant styled properly (string[] type)', async () => {
    const style = createStyle(config.theme, config.themeMappings.test, ['dark']);

    expect(style.backgroundColor).toEqual(config.values.backgroundDark);
    expect(style.textColor).toEqual(config.values.textDefault);
  });

  it('array of non-default variants styled created properly (string[] type)', async () => {
    const style = createStyle(config.theme, config.themeMappings.test, ['dark', 'success']);

    expect(style.backgroundColor).toEqual(config.values.backgroundDark);
    expect(style.textColor).toEqual(config.values.textSuccess);
  });

});

