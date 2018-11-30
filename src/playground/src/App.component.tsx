import React from 'react';
import {
  DesignProvider,
  Tokens,
} from '@rk-kit/design';
import { ThemeProvider } from '@rk-kit/theme';
import {
  Sample,
  ThemeType,
} from '@rk-kit/ui';

interface State {
  theme: ThemeType;
}

export default class App extends React.Component<any, State> {

  constructor(props) {
    super(props);
    this.state = {
      theme: Tokens,
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
