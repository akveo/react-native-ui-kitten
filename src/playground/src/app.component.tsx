import React from 'react';
import {
  StyleProvider,
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

  sampleRef = undefined;

  constructor(props) {
    super(props);
    this.state = {
      mappings: Mappings,
      theme: Theme,
    };
  }

  setSampleRef = (ref) => {
    this.sampleRef = ref;
  };

  render() {
    return (
      <StyleProvider theme={this.state.theme} mapping={this.state.mappings}>
        <Sample
          ref={this.setSampleRef}
          variant='dark success'
        />
      </StyleProvider>
    );
  }
}
