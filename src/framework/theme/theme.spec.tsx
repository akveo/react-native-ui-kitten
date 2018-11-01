import React from 'react';
import {View} from 'react-native';
import * as UITest from 'react-native-testing-library';
import {ThemeProvider, withTheme, WithThemeProps} from './index';

interface TestProps extends WithThemeProps {
  name: string;
}

class TestComponent extends React.Component<TestProps> {
  render() {
    const {theme, name} = this.props;

    return (
      <View/>
    );
  }
}

it('Checks simple Provider/Consumer theme pass', async () => {
  const ThemedComponent = withTheme(TestComponent);

  const component = UITest.render(
    <ThemeProvider>
      <ThemedComponent name={'test'}/>
    </ThemeProvider>,
  );

  // TODO: finish test
});

