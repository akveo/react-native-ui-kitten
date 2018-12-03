import React, { ComponentType } from 'react';
import { DesignType } from '@rk-kit/design';
import DesignContext from './designContext';
import {
  getComponentDesign,
  forwardProps,
} from '../../service';

export interface Props<P> extends React.ClassAttributes<P> {
  design: DesignType;
}

export function withDesign<P extends Props<P>>(Component: ComponentType<P>) {
  type TExcept = Exclude<keyof P, keyof Props<P>>;
  type ForwardedProps = Pick<P, TExcept>;

  class Wrapper extends React.Component<ForwardedProps> {
    wrappedComponentRef = undefined;
    getWrappedInstance = undefined;

    setWrappedComponentRef = (ref) => {
      this.wrappedComponentRef = ref;
    };

    getComponentName = () => Component.displayName || Component.name;

    renderWrappedComponent = (design: DesignType[]) => (
      <Component
        ref={this.setWrappedComponentRef}
        design={getComponentDesign(this.getComponentName(), design)}
        {...this.props}
      />
    );

    render() {
      return (
        <DesignContext.Consumer>
          {this.renderWrappedComponent}
        </DesignContext.Consumer>
      );
    }
  }

  const Result = Wrapper;
  Result.prototype.getWrappedInstance = function getWrappedInstance() {
    const hasWrappedInstance = this.wrappedComponentRef && this.wrappedComponentRef.getWrappedInstance;
    return hasWrappedInstance ? this.wrappedComponentRef.getWrappedInstance() : this.wrappedComponentRef;
  };

  return forwardProps(Component, Result);
}
