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
} from './';

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

  // FIXME(@theme/test): this is not what theme should be like!
  // Refactor to: { backgroundColor: '#ffffff' }

  state = {
    theme: [{
      name: 'backgroundColor',
      value: ActionedProvider.initialThemeColor,
    }],
  };

  isInitialColor = (color: string): boolean => color === ActionedProvider.initialThemeColor;

  getInversedColor = (color: string): string => {
    const isInitialColor = this.isInitialColor(color);
    return isInitialColor ? ActionedProvider.onChangeThemeColor : ActionedProvider.initialThemeColor;
  };

  onThemeChangeTouchablePress = () => {
    this.setState({
      theme: [{
        name: 'backgroundColor',
        value: this.getInversedColor(this.state.theme[0].value),
      }],
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

  createThemedComponent1Styles = (theme: ThemeType) => ({
    container: {
      backgroundColor: theme.find(option => option.name === 'color').value,
    },
  });

  createThemedComponent2Styles = (theme: ThemeType) => ({
    container: {
      backgroundColor: theme.find(option => option.name === 'color').value,
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
      <ThemeProvider theme={[]}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent).not.toBeNull();
  });

  it('receives theme prop', async () => {
    const ThemedComponent = withTheme(ThemedConsumer);

    const component = render(
      <ThemeProvider theme={[]}>
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

    const themeOption = themedComponent.props.theme.find(option => option.name === 'backgroundColor');
    expect(themeOption.value).toEqual(ActionedProvider.onChangeThemeColor);
  });

});

describe('@theme: styled theme consumer checks', () => {

  it('renders properly', async () => {
    const ThemedComponent = withThemedStyles(ThemedConsumer, (theme: ThemeType) => {
      return {};
    });

    const component = render(
      <ThemeProvider theme={[]}>
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
      <ThemeProvider theme={[]}>
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
      <ThemeProvider theme={[]}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent.props.themedStyle).not.toBeNull();
  });

  it('child theme provider overrides parent theme', async () => {
    const theme1: ThemeType = [{
      name: 'color',
      value: '#3F51B5',
    }];
    const theme2: ThemeType = [{
      name: 'color',
      value: '#009688',
    }];

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

// TODO(theme/test): write service methods tests

