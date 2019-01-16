import React from 'react';
import {
  ThemeMappingType,
  ThemeMapType,
} from 'eva/packages/common';
import {
  MappingProvider,
  MappingProviderProps,
} from '../mapping';
import {
  ThemeProvider,
  ThemeProviderProps,
} from '../theme';
import { ThemeType } from '../../type';

export type Props = MappingProviderProps & ThemeProviderProps;

interface State {
  mapping: ThemeMappingType;
  styles: ThemeMapType;
  theme: ThemeType;
}

export class StyleProvider extends React.PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      mapping: props.mapping,
      styles: props.styles,
      theme: props.theme,
    };
  }

  render() {
    return (
      <MappingProvider mapping={this.state.mapping} styles={this.state.styles}>
        <ThemeProvider theme={this.state.theme}>
          {this.props.children}
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
