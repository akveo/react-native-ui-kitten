import React, { ComponentType } from 'react';
import { ThemeType } from './type';
import {
  Consumer,
  forwardProps,
} from '../service';

export interface Props<P> extends React.ClassAttributes<P> {
  theme: ThemeType;
}

export function withTheme<P extends Props<P>>(Component: ComponentType<P>) {
  type TExcept = Exclude<keyof P, keyof Props<P>>;
  type ForwardedProps = Pick<P, TExcept>;

  class Shadow extends React.Component<ForwardedProps> {
    wrappedComponentRef = undefined;
    getWrappedInstance = undefined;

    setWrappedComponentRef = (ref) => {
      this.wrappedComponentRef = ref;
    };

    renderWrappedComponent = (theme: ThemeType) => (
      <Component
        ref={this.setWrappedComponentRef}
        theme={theme}
        {...this.props}
      />
    );

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
