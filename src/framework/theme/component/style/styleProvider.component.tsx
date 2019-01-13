import React from 'react';
import { ThemeMappingType } from 'eva/rk-kit';
import {
  MappingProvider,
  MappingProviderProps,
} from '../mapping';
import {
  ThemeProvider,
  ThemeProviderProps,
} from '../theme';
import {
  ThemeType,
  StyleType,
} from '../../type';

export type CreateStyleFunction = (component: string,
                                   appearance: string,
                                   variants: string[],
                                   states: string[]) => StyleType;

export type Props = MappingProviderProps & ThemeProviderProps;

interface State {
  mapping: ThemeMappingType;
  theme: ThemeType;
}

export class StyleProvider extends React.PureComponent<Props, State> {

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
          {this.props.children}
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
