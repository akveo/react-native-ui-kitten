import React from 'react';
import {
  ThemeMappingType,
} from 'eva';
import {
  MappingProvider,
  MappingProviderProps,
} from './mapping';
import {
  ThemeProvider,
  ThemeProviderProps,
  ThemeType,
} from './theme';
import {
  StyleProvider,
  StyleProviderProps,
} from './style';

export type Props = MappingProviderProps & ThemeProviderProps & StyleProviderProps;

interface State {
  mapping: ThemeMappingType;
  theme: ThemeType;
}

export class AppContainer extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      mapping: props.mapping,
      theme: props.theme,
    };
  }

  render() {
    return (
      <MappingProvider mapping={this.state.mapping}>
        <ThemeProvider theme={this.state.theme}>
          <StyleProvider
            mapping={this.state.mapping}
            theme={this.state.theme}>
            {this.props.children}
          </StyleProvider>
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
