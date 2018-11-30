import React from 'react';
import {
  Components,
  DesignType,
} from '@rk-kit/design';
import DesignContext from './designContext';

export interface Props {
  children: JSX.Element | React.ReactNode;
}

const design: DesignType[] = Components;

export class DesignProvider extends React.PureComponent<Props> {

  render() {
    return (
      <DesignContext.Provider
        value={design}>
        {this.props.children}
      </DesignContext.Provider>
    );
  }
}
