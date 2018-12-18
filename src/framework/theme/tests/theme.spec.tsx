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
import * as config from './config';
import { getThemeToken } from '../service';

const themeConsumerTestId = '@theme/consumer';
const themeChangeTouchableTestId = '@theme/btnChangeTheme';

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
  theme1: ThemeType;
  theme2: ThemeType;
}

class ActionMock extends React.Component<ActionMockProps> {

  constructor(props) {
    super(props);
    this.state.theme = this.props.theme1;
  }

  state = {
    theme: undefined,
  };

  onTouchablePress = () => {
    this.setState({
      theme: this.props.theme2,
    });
  };

  render() {
    const ThemedComponent = withStyles(ComponentMock);
    return (
      <ThemeProvider theme={this.state.theme}>
        <ThemedComponent/>
        <TouchableOpacity
          testID={themeChangeTouchableTestId}
          onPress={this.onTouchablePress}
        />
      </ThemeProvider>
    );
  }
}

interface OverrideMockProps {
  theme1: ThemeType;
  theme2: ThemeType;
  createStyle: (theme: ThemeType) => StyleType;
}

class OverrideMock extends React.Component<OverrideMockProps> {

  render() {
    const ThemedComponent1 = withStyles(ComponentMock, this.props.createStyle);
    const ThemedComponent2 = withStyles(ComponentMock, this.props.createStyle);
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

const createThemedStyleMock = (theme: ThemeType) => ({
  color: theme.backgroundColorTestDefault,
});

describe('@theme: service methods checks', () => {

  it('retrieves correct theme token', async () => {
    const themeToken = getThemeToken(config.theme, 'backgroundColorTestDefault');
    const undefinedToken = getThemeToken(config.theme, 'undefined');

    expect(themeToken).toEqual(config.values.backgroundDefault);
    expect(undefinedToken).toBeUndefined();
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

    const themedComponent1Style = themedComponents[0].props.themedStyle;
    const themedComponent2Style = themedComponents[1].props.themedStyle;

    expect(JSON.stringify(themedComponent1Style)).not.toEqual(JSON.stringify(themedComponent2Style));
  });

});
