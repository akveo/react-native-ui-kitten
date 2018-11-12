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

class ConsumerComponent extends React.Component<any> {
  static defaultProps = {
    testID: themeConsumerTestId,
  };

  render() {
    return (
      <View testID={this.props.testID}/>
    );
  }
}

class ActionComponent extends React.Component<any> {

  static initialThemeColor = '#ffffff';
  static onChangeThemeColor = '#000000';

  state = {
    theme: {
      backgroundColor: ActionComponent.initialThemeColor,
    },
  };

  isInitialColor = (color: string): boolean => color === ActionComponent.initialThemeColor;

  getInversedColor = (color: string): string => {
    const isInitialColor = this.isInitialColor(color);
    return isInitialColor ? ActionComponent.onChangeThemeColor : ActionComponent.initialThemeColor;
  };

  onThemeChangeTouchablePress = () => {
    this.setState({
      theme: {
        backgroundColor: this.getInversedColor(this.state.theme.backgroundColor),
      },
    });
  };

  render() {
    const ThemedComponent = withTheme(ConsumerComponent);
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

describe('@theme: theme consumer checks', () => {

  it('renders properly', async () => {
    const ThemedComponent = withTheme(ConsumerComponent);

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent).not.toBeNull();
  });

  it('receives theme prop', async () => {
    const ThemedComponent = withTheme(ConsumerComponent);

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
      <ActionComponent/>,
    );

    const touchableComponent = component.getByTestId(themeChangeTouchableTestId);

    fireEvent.press(touchableComponent);

    const themedComponent = await waitForElement(() => {
      return component.getByTestId(themeConsumerTestId);
    });

    expect(themedComponent.props.theme.backgroundColor).toEqual(ActionComponent.onChangeThemeColor);
  });

});

describe('@theme: styled theme consumer checks', () => {

  it('renders properly', async () => {
    const ThemedComponent = withThemedStyles(ConsumerComponent, (theme: ThemeType) => {
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
    const ThemedComponent = withThemedStyles(ConsumerComponent, (theme: ThemeType) => {
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
    const ThemedComponent = withThemedStyles(ConsumerComponent, (theme: ThemeType) => {
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

});
