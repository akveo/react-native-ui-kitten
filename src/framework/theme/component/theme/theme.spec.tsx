import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fireEvent,
  waitForElement,
  render,
} from 'react-native-testing-library';
import { ThemeProvider } from './themeProvider.component';
import { withStyles } from './themeConsumer.component';
import { ThemeType } from '../../type';
import * as config from './theme.spec.config';

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
      <ThemeProvider theme={config.theme}>
        <ThemedComponent/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);

    expect(json(themedComponent.props.theme)).toEqual(json(config.theme));
    expect(themedComponent.props.themedStyle.container.backgroundColor).toEqual(config.theme.grayPrimary);
    expect(themedComponent.props.themedStyle).not.toBeNull();
    expect(themedComponent.props.themedStyle).not.toBeUndefined();
  });

  it('able to change theme', async () => {
    const component = render(
      <ActionMock
        theme={config.theme}
        themeInverse={config.themeInverse}
      />,
    );

    const touchableComponent = component.getByTestId(themeChangeTouchableTestId);

    fireEvent.press(touchableComponent);

    const themedComponent = await waitForElement(() => {
      return component.getByTestId(themeConsumerTestId);
    });

    expect(json(themedComponent.props.theme)).toEqual(json(config.themeInverse));
  });

  it('able to override theme', async () => {
    const component = render(
      <OverrideMock
        theme={config.theme}
        themeInverse={config.themeInverse}
      />,
    );

    const themedComponents = component.getAllByType(ComponentMock);

    expect(themedComponents.length).toBeGreaterThan(1);

    const theme1 = themedComponents[0].props.theme;
    const theme2 = themedComponents[1].props.theme;

    expect(theme1).not.toEqual(theme2);
    expect(json(theme1)).toEqual(json(config.theme));
    expect(json(theme2)).toEqual(json(config.themeInverse));
  });

});
