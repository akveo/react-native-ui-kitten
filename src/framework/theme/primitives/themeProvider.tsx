import React from 'react';
import {Provider} from './createContext';

interface PropsType {
  children: JSX.Element;
  theme: Object;
}

class ThemeProvider extends React.PureComponent<PropsType> {

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

export default ThemeProvider;
