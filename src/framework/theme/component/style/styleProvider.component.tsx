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

  public render(): React.ReactNode {
    const { style, theme, mapping, children } = this.props;

    return (
      <MappingProvider
        style={style}
        mapping={mapping}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
