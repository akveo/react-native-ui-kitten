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
    return (
      <MappingContext.Provider
        value={{ mapping: this.props.mapping, styles: this.props.styles }}>
        {this.props.children}
      </MappingContext.Provider>
    );
  }
}
