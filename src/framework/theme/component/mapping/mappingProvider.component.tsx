import React from 'react';
import {
  ThemeMappingType,
  ThemeStyleType,
} from 'eva/packages/types';
import { MappingContext } from './mappingContext';

export interface Props {
  style: ThemeStyleType;
  mapping?: ThemeMappingType;
  children: React.ReactNode;
}

export class MappingProvider extends React.PureComponent<Props> {

  public render(): React.ReactNode {
    const { style, mapping, children } = this.props;

    return (
      <MappingContext.Provider
        value={{ style, mapping }}>
        {children}
      </MappingContext.Provider>
    );
  }
}
