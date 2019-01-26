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

  public state: State = {
    mapping: this.props.mapping,
    styles: this.props.styles,
    theme: this.props.theme,
  };

  public render(): React.ReactNode {
    return (
      <MappingProvider mapping={this.state.mapping} styles={this.state.styles}>
        <ThemeProvider theme={this.state.theme}>
          {this.props.children}
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
