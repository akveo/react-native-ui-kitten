import React from 'react';
import {
  ThemeMappingType,
  ThemeMapType,
} from 'eva/packages/common';
import { MappingContext } from './mappingContext';

export interface Props {
  mapping: ThemeMappingType;
  styles: ThemeMapType;
  children: JSX.Element | React.ReactNode;
}

export class MappingProvider extends React.PureComponent<Props> {

  render() {
    return (
      <MappingContext.Provider
        value={{ mapping: this.props.mapping, styles: this.props.styles }}>
        {this.props.children}
      </MappingContext.Provider>
    );
  }
}
