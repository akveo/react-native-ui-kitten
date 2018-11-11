import React from 'react';
import { Consumer } from '../service';
import { ThemeShape } from './model';

export interface Props {
  theme: ThemeShape;
}

export function withTheme<T extends Props>(Component: React.ComponentType<T>) {

  type TExcept = Exclude<keyof T, keyof Props>;
  type ForwardedProps = Pick<T, TExcept>;

  class Shadow extends React.Component<ForwardedProps> {

    constructor(props) {
      super(props);
      this.renderWrappedComponent = this.renderWrappedComponent.bind(this);
    }

    renderWrappedComponent(theme: ThemeShape) {
      return (
        <Component
          theme={theme}
          {...this.props}
        />
      );
    }

    render() {
      return (
        <Consumer>
          {this.renderWrappedComponent}
        </Consumer>
      );
    }
  }

  return Shadow;
}
