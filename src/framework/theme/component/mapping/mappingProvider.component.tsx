import React from 'react';
import { MappingContext } from './mappingContext';
import { ThemeMappingType } from './type';

export interface Props {
  mapping: ThemeMappingType;
  children: JSX.Element | React.ReactNode;
}

export class MappingProvider extends React.PureComponent<Props> {

  render() {
    return (
      <MappingContext.Provider
        value={this.props.mapping}>
        {this.props.children}
      </MappingContext.Provider>
    );
  }
}
