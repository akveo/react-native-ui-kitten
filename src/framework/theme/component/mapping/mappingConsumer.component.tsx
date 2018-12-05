import React, { ComponentType } from 'react';
import MappingContext from './mappingContext';
import { ThemeMappingType } from './type';
import {
  getComponentThemeMapping,
  forwardProps,
} from '../../service';

export interface Props<P> extends React.ClassAttributes<P> {
  mapping: ThemeMappingType;
}

export function withMapping<P extends Props<P>>(Component: ComponentType<P>) {
  type TExcept = Exclude<keyof P, keyof Props<P>>;
  type ForwardedProps = Pick<P, TExcept>;

  class Wrapper extends React.Component<ForwardedProps> {
    wrappedComponentRef = undefined;
    getWrappedInstance = undefined;

    setWrappedComponentRef = (ref) => {
      this.wrappedComponentRef = ref;
    };

    getComponentName = () => Component.displayName || Component.name;

    renderWrappedComponent = (mapping: ThemeMappingType[]) => (
      <Component
        ref={this.setWrappedComponentRef}
        mapping={getComponentThemeMapping(this.getComponentName(), mapping)}
        {...this.props}
      />
    );

    render() {
      return (
        <MappingContext.Consumer>
          {this.renderWrappedComponent}
        </MappingContext.Consumer>
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
