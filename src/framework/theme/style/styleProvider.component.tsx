/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  MappingProvider,
  MappingProviderProps,
} from '../mapping/mappingProvider.component';
import {
  ThemeProvider,
  ThemeProviderProps,
} from '../theme/themeProvider.component';

export type StyleProviderProps = MappingProviderProps & ThemeProviderProps;

export class StyleProvider extends React.PureComponent<StyleProviderProps> {

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
