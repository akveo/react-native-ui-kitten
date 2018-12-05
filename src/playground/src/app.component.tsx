import React from 'react';
import {
  ThemeMappingProvider,
  ThemeProvider,
  ThemeMappingType,
  ThemeType,
} from '@rk-kit/theme';
import { Sample } from '@rk-kit/ui';
import {
  Mappings,
  Theme,
} from './theme-token';

interface State {
  mappings: ThemeMappingType[];
  theme: ThemeType;
}

export default class App extends React.Component<any, State> {

  constructor(props) {
    super(props);
    this.state = {
      mappings: Mappings,
      theme: Theme,
    };
  }

  render() {
    return (
      <ThemeMappingProvider mapping={this.state.mappings}>
        <ThemeProvider theme={this.state.theme}>
          <Sample variant='dark'/>
        </ThemeProvider>
      </ThemeMappingProvider>
    );
  }
}
