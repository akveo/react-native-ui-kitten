import React, { ComponentType } from 'react';
import {
  Consumer,
  forwardProps,
} from '../service';
import { ThemeShape } from './model';

export interface Props<T> extends React.ClassAttributes<T> {
  theme: ThemeShape;
}

export function withTheme<T extends Props<T>>(Component: ComponentType<T>) {
  type TExcept = Exclude<keyof T, keyof Props<T>>;
  type ForwardedProps = Pick<T, TExcept>;

  class Shadow extends React.Component<ForwardedProps> {
    wrappedComponentRef = undefined;
    getWrappedInstance = undefined;

    constructor(props) {
      super(props);
      this.setWrappedComponentRef = this.setWrappedComponentRef.bind(this);
    }

    setWrappedComponentRef(ref) {
      this.wrappedComponentRef = ref;
    }

    renderWrappedComponent(theme: ThemeShape) {
      return (
        <Component
          ref={this.setWrappedComponentRef}
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

  const Result = Shadow;
  Result.prototype.getWrappedInstance = function getWrappedInstance() {
    const hasWrappedInstance = this.wrappedComponentRef && this.wrappedComponentRef.getWrappedInstance;
    return hasWrappedInstance ? this.wrappedComponentRef.getWrappedInstance() : this.wrappedComponentRef;
  };

  return forwardProps(Component, Result);
}
