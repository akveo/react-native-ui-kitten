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
  withTheme,
  withThemedStyles,
  ThemeType,
} from './component';

const themeConsumerTestId = '@theme/consumer';
const themeChangeTouchableTestId = '@theme/btnChangeTheme';

interface Theme extends ThemeType {
  color: string;
}

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
    const ThemedComponent = withTheme(ThemedConsumer);
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

  createThemedComponent1Styles = (theme: Theme) => ({
    container: {
      backgroundColor: theme.color,
    },
  });

  createThemedComponent2Styles = (theme: Theme) => ({
    container: {
      backgroundColor: theme.color,
    },
  });

  render() {
    const ThemedComponent1 = withThemedStyles(ThemedStyleConsumer, this.createThemedComponent1Styles);
    const ThemedComponent2 = withThemedStyles(ThemedStyleConsumer, this.createThemedComponent2Styles);
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
    const ThemedComponent = withTheme(ThemedConsumer);

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent).not.toBeNull();
  });

  it('receives theme prop', async () => {
    const ThemedComponent = withTheme(ThemedConsumer);

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent.props.theme).not.toBeNull();
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

});

describe('@theme: styled theme consumer checks', () => {

  it('renders properly', async () => {
    const ThemedComponent = withThemedStyles(ThemedConsumer, (theme: ThemeType) => {
      return {};
    });

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent testID={themeConsumerTestId}/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent).not.toBeNull();
  });

  it('receives theme prop', async () => {
    const ThemedComponent = withThemedStyles(ThemedConsumer, (theme: ThemeType) => {
      return {};
    });

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent.props.theme).not.toBeNull();
  });

  it('receives themedStyle prop', async () => {
    const ThemedComponent = withThemedStyles(ThemedConsumer, (theme: ThemeType) => {
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

  it('child theme provider overrides parent theme', async () => {
    const theme1: Theme = {
      color: '#3F51B5',
    };
    const theme2: Theme = {
      color: '#009688',
    };

    const component = render(
      <ThemedStyleProvider
        theme1={theme1}
        theme2={theme2}
      />,
    );

    const themedComponents = component.getAllByName(ThemedStyleConsumer);

    expect(themedComponents.length).toBeGreaterThan(1);

    const themedComponent1Color = themedComponents[0].props.themedStyle.container.backgroundColor;
    const themedComponent2Color = themedComponents[1].props.themedStyle.container.backgroundColor;

    expect(themedComponent1Color).not.toEqual(themedComponent2Color);
  });

});
