import React from 'react';
import { ThemeMappingType } from 'eva/rk-kit';
import { MappingContext } from './mappingContext';

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
