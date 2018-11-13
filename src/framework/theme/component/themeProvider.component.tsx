import React, { ReactNode } from 'react';
import { Provider } from '../service';
import { ThemeType } from './type';

interface Props {
  children: JSX.Element | ReactNode;
  theme: ThemeType;
}

export class ThemeProvider extends React.PureComponent<Props> {

  static defaultProps = {
    theme: {},
  };

  render() {
    return (
      <Provider
        value={this.props.theme}>
        {this.props.children}
      </Provider>
    );
  }
}
