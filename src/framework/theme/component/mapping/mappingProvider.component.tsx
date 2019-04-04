import React from 'react';
import { ThemeStyleType } from '@eva/core';
import { MappingContext } from './mappingContext';

interface MappingProviderProps {
  styles: ThemeStyleType;
  children?: React.ReactNode;
}

export type Props = MappingProviderProps;

export class MappingProvider extends React.PureComponent<Props> {

  public render(): React.ReactNode {
    const { styles, children } = this.props;

    return (
      <MappingContext.Provider
        value={styles}>
        {children}
      </MappingContext.Provider>
    );
  }
}
