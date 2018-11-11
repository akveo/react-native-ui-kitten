import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import {
  ThemeProvider,
  withTheme,
  withThemedStyles,
  ThemeShape,
} from './component';

const themeConsumerTestId = '@theme/consumer';

class TestComponent extends React.Component<any> {
  render() {
    return (
      <View testID={this.props.testId}/>
    );
  }
}

describe('@theme: theme consumer checks', () => {

  it('renders properly', async () => {
    const ThemedComponent = withTheme(TestComponent);

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent testId={themeConsumerTestId}/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent).not.toBeNull();
  });

  it('receives theme prop', async () => {
    const ThemedComponent = withTheme(TestComponent);

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent testId={themeConsumerTestId}/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent.props.theme).not.toBeNull();
  });

});

describe('@theme: styled theme consumer checks', () => {

  it('renders properly', async () => {
    const ThemedComponent = withThemedStyles(TestComponent, (theme: ThemeShape) => {
      return {};
    });

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent testId={themeConsumerTestId}/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent).not.toBeNull();
  });

  it('receives theme prop', async () => {
    const ThemedComponent = withThemedStyles(TestComponent, (theme: ThemeShape) => {
      return {};
    });

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent testId={themeConsumerTestId}/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent.props.theme).not.toBeNull();
  });

  it('receives themedStyle prop', async () => {
    const ThemedComponent = withThemedStyles(TestComponent, (theme: ThemeShape) => {
      return {};
    });

    const component = render(
      <ThemeProvider theme={{}}>
        <ThemedComponent testId={themeConsumerTestId}/>
      </ThemeProvider>,
    );

    const themedComponent = component.getByTestId(themeConsumerTestId);
    expect(themedComponent.props.themedStyle).not.toBeNull();
  });

});
