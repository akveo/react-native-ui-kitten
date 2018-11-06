import React from 'react';
import { Provider } from '../service';

interface ProviderProps {
  children: JSX.Element;
  theme: Object;
}

export class ThemeProvider extends React.PureComponent<ProviderProps> {
  static defaultProps = {
    theme: {},
  };

  render() {
    return (
      <Provider value={this.props.theme}>
        {this.props.children}
      </Provider>
    );
  }
}
