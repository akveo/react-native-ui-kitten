import React from 'react';
import {
  ThemeMappingType,
  ThemeMapType,
} from 'eva/packages/common';
import { MappingContext } from './mappingContext';

export interface Props {
  mapping: ThemeMappingType;
  styles: ThemeMapType;
  children: React.ReactNode;
}

export class MappingProvider extends React.PureComponent<Props> {

  public render(): React.ReactNode {
    const { mapping, styles, children } = this.props;

    return (
      <MappingContext.Provider
        value={{ mapping, styles }}>
        {children}
      </MappingContext.Provider>
    );
  }
}
