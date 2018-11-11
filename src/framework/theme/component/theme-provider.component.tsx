import React from 'react';
import { Provider } from '../service';
import { ThemeShape } from './model';

interface Props {
  children: JSX.Element;
  theme: ThemeShape;
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
