import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ThemeShape,
  ThemedStyleShape,
  StyleSheetShape,
} from './model';
import {
  Consumer,
  forwardProps,
} from '../service';

export interface Props<P> extends React.ClassAttributes<P> {
  theme: ThemeShape;
  themedStyle: ThemedStyleShape;
}

export function withThemedStyles<P extends Props<P>>(
  Component: React.ComponentType<P>,
  createStyles: (theme: ThemeShape) => StyleSheetShape,
) {
  type TExcept = Exclude<keyof P, keyof Props<P>>;
  type ForwardedProps = Pick<P, TExcept>;

  class Shadow extends React.Component<ForwardedProps> {
    wrappedComponentRef = undefined;
    getWrappedInstance = undefined;

    constructor(props) {
      super(props);
      this.renderWrappedComponent = this.renderWrappedComponent.bind(this);
      this.setWrappedComponentRef = this.setWrappedComponentRef.bind(this);
    }

    setWrappedComponentRef(ref) {
      this.wrappedComponentRef = ref;
    }

    renderWrappedComponent(theme: ThemeShape) {
      const styles = StyleSheet.create(createStyles(theme));
      return (
        <Component
          ref={this.setWrappedComponentRef}
          theme={theme}
          themedStyle={styles}
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
