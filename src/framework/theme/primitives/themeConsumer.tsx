import React from 'react';
import { Consumer } from './createContext';

export interface WithThemeProps {
  theme: Object;
}

export function withTheme<T extends WithThemeProps>(Component: React.ComponentType<T>) {

  type TExcept = Exclude<keyof T, keyof WithThemeProps>;
  type ForwardedProps = Pick<T, TExcept>;

  return class WithTheme extends React.Component<ForwardedProps, {}> {

    render() {
      return (
        <Consumer>
          {theme => <Component {...this.props} theme={theme}/>}
        </Consumer>
      );
    }
  };
}
