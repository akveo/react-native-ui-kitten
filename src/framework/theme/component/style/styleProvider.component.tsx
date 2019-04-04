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
    const { styles, theme, children } = this.props;

    return (
      <MappingProvider styles={styles}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
