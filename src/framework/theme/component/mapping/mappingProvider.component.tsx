import React from 'react';
import {
  ThemeMappingType,
  ThemeStyleType,
} from 'eva/packages/types';
import { MappingContext } from './mappingContext';

export interface Props {
  mapping: ThemeMappingType;
  styles: ThemeStyleType;
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
