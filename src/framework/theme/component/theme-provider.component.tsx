import React from 'react';
import { Provider } from '../service';
import { ThemeType } from './type';

interface Props {
  children: JSX.Element;
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
