import React from 'react';
import {
  DesignProvider,
  ThemeProvider,
  DefaultTheme,
  ThemeType,
} from '@rk-kit/theme';
import { Sample } from '@rk-kit/ui';

interface State {
  theme: ThemeType;
}

export default class App extends React.Component<any, State> {

  constructor(props) {
    super(props);
    this.state = {
      theme: DefaultTheme,
    };
  }

  render() {
    return (
      <DesignProvider>
        <ThemeProvider theme={this.state.theme}>
          <Sample variant='dark'/>
        </ThemeProvider>
      </DesignProvider>
    );
  }
}
