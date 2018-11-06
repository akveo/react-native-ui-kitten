import React from 'react';
import {
  Consumer,
  forwardProps,
} from '../service';

export interface ThemedComponentProps<T> extends React.ClassAttributes<T> {
  theme: Object;
}

export function withTheme<T extends ThemedComponentProps<T>>(Component: React.ComponentType<T>) {
  type TExcept = Exclude<keyof T, keyof ThemedComponentProps<T>>;
  type ForwardedProps = Pick<T, TExcept>;

  class ConsumingComponent extends React.Component<ForwardedProps, {}> {
    rootComponentRef = undefined;

    getConsumingComponent = undefined;

    constructor(props) {
      super(props);
      this.setRootComponentRef = this.setRootComponentRef.bind(this);
    }

    setRootComponentRef(ref) {
      this.rootComponentRef = ref;
    }

    renderRootComponent(component: React.ComponentType<T>, theme: Object) {
      const RootComponent = component;
      return (
        <RootComponent
          ref={this.setRootComponentRef}
          theme={theme}
          {...this.props}
        />
      );
    }

    render() {
      return (
        <Consumer>
          {theme => this.renderRootComponent(Component, theme)}
        </Consumer>
      );
    }
  }

  const ResultComponent = ConsumingComponent;
  ResultComponent.prototype.getConsumingComponent = function getWrappedInstance() {
    const hasWrappedInstance = this.rootComponentRef.getConsumingComponent;
    return hasWrappedInstance ? this.rootComponentRef.getConsumingComponent() : this.rootComponentRef;
  };

  return forwardProps(ResultComponent, Component);
}
