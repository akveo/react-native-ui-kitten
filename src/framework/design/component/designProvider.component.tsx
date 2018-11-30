import React, { ReactNode } from 'react';
import { Provider } from '../service';
import { Components } from '../config';
import { DesignType } from './type';

interface Props {
  children: JSX.Element | ReactNode;
}

const design: DesignType[] = Components;

export class DesignProvider extends React.PureComponent<Props> {

  render() {
    return (
      <Provider value={design}>{this.props.children}</Provider>
    );
  }
}
