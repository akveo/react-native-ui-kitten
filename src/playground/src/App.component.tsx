import React from 'react';
import { Sample } from '@rk-kit/ui';
import {
  ThemeProvider,
  withTheme,
} from '@rk-kit/theme';

class ThemedSample extends React.Component<any> {

  render() {
    return (
      <Sample text={this.props.theme.text}/>
    );
  }
}

export default class App extends React.Component {

  state = {
    theme: {
      text: 'test',
    },
  };

  render() {
    const ThemedComponent = withTheme(ThemedSample);
    return (
      <ThemeProvider theme={this.state.theme}>
        <ThemedComponent/>
      </ThemeProvider>
    );
  }
}
