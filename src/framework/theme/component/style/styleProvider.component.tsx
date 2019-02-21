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
    const { mapping, styles, theme, children } = this.props;

    return (
      <MappingProvider
        mapping={mapping}
        styles={styles}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
