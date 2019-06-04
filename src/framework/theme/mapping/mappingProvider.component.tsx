import React from 'react';
import { ThemeStyleType } from '@eva-design/dss';
import { MappingContext } from './mappingContext';

export interface MappingProviderProps {
  styles: ThemeStyleType;
  children?: React.ReactNode;
}

export class MappingProvider extends React.PureComponent<MappingProviderProps> {

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
