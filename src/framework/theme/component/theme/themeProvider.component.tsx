import React, { ReactNode } from 'react';
import { ThemeContext } from './themeContext';
import { ThemeType } from '../../type';

export interface Props {
  theme: ThemeType;
  children: JSX.Element | ReactNode;
}

export class ThemeProvider extends React.PureComponent<Props> {

  render() {
    return (
      <ThemeContext.Provider
        value={this.props.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
