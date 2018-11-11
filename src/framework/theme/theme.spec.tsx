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

it('Checks theme consumer renders properly', async () => {
  const ThemedComponent = withTheme(TestComponent);

  const component = render(
    <ThemeProvider theme={{}}>
      <ThemedComponent testId={themeConsumerTestId}/>
    </ThemeProvider>,
  );

  const themedComponent = component.getByTestId(themeConsumerTestId);
  expect(themedComponent).not.toBeNull();
});

it('Checks theme consumer receives theme prop', async () => {
  const ThemedComponent = withTheme(TestComponent);

  const component = render(
    <ThemeProvider theme={{}}>
      <ThemedComponent testId={themeConsumerTestId}/>
    </ThemeProvider>,
  );

  const themedComponent = component.getByTestId(themeConsumerTestId);
  expect(themedComponent.props.theme).not.toBeNull();
});

it('Checks styled theme consumer renders properly', async () => {
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

it('Checks styled theme consumer receives theme prop', async () => {
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

it('Checks styled theme consumer receives themedStyle prop', async () => {
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

