import React, { ReactNode } from 'react';
import { Tokens } from '@rk-kit/design';
import { ThemeType } from './type';
import ThemeContext from './themeContext';

export interface Props {
  theme: ThemeType;
  children: JSX.Element | ReactNode;
}

export class ThemeProvider extends React.PureComponent<Props> {

  static defaultProps = {
    theme: Tokens,
  };

  render() {
    return (
      <ThemeContext.Provider
        value={this.props.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
