import React from 'react';
import {View} from 'react-native';
import * as UITest from 'react-native-testing-library';
import {ThemeProvider, withTheme, WithThemeProps} from './index';

interface TestProps extends WithThemeProps {
  testId: string;
}

class TestComponent extends React.Component<TestProps> {
  render() {
    console.info(`TestComponent theme prop: ${JSON.stringify(this.props.theme)}`);
    return (
      <View testID={this.props.testId}/>
    );
  }
}

it('Checks theme consumer renders properly', async () => {
  const ThemedComponent = withTheme(TestComponent);
  const themedComponentTestId = '@theme/root';

  const component = UITest.render(
    <ThemeProvider theme={{}}>
      <ThemedComponent testId={themedComponentTestId}/>
    </ThemeProvider>,
  );

  const themedComponent = component.getByTestId(themedComponentTestId);
  expect(themedComponent).not.toBeNull();
});

it('Checks theme consumer receives theme prop', async () => {
  const ThemedComponent = withTheme(TestComponent);
  const themedComponentTestId = '@theme/root';

  const component = UITest.render(
    <ThemeProvider theme={{}}>
      <ThemedComponent testId={themedComponentTestId}/>
    </ThemeProvider>,
  );

  const themedComponent = component.getByTestId(themedComponentTestId);
  expect(themedComponent.props.theme).not.toBeNull();
});
