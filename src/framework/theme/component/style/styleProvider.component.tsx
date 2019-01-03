import React from 'react';
import {
  MappingProvider,
  MappingProviderProps,
  ThemeMappingType,
} from '../mapping';
import {
  ThemeProvider,
  ThemeProviderProps,
  ThemeType,
} from '../theme';

export type Props = MappingProviderProps & ThemeProviderProps;

interface State {
  mapping: ThemeMappingType;
  theme: ThemeType;
}

export class StyleProvider extends React.Component<Props, State> {

  static getDerivedStateFromProps(props: Props): State {
    return {
      mapping: props.mapping,
      theme: props.theme,
    };
  }

  state: State = {
    mapping: [],
    theme: {},
  };

  render() {
    return (
      <MappingProvider mapping={this.state.mapping}>
        <ThemeProvider theme={this.state.theme}>
          {this.props.children}
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
