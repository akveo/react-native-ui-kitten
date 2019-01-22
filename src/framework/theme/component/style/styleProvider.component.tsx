import React from 'react';
import {
  MappingProvider,
  MappingProviderProps,
} from '../mapping';
import {
  ThemeProvider,
  ThemeProviderProps,
} from '../theme';

export type Props = MappingProviderProps & ThemeProviderProps;

export class StyleProvider extends React.PureComponent<Props> {

  render() {
    return (
      <MappingProvider mapping={this.props.mapping} styles={this.props.styles}>
        <ThemeProvider theme={this.props.theme}>
          {this.props.children}
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
