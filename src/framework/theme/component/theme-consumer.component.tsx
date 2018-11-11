import React, { ComponentType } from 'react';
import { StyleSheet } from 'react-native';
import {
  Consumer,
  forwardProps,
} from '../service';
import {
  ThemeShape,
  ThemedStyleShape,
  StyleSheetShape,
} from './model';

export interface ThemedProps<T> extends React.ClassAttributes<T> {
  theme: ThemeShape;
}

export interface ThemedStyleProps<P> extends ThemedProps<P> {
  themedStyle: ThemedStyleShape;
}

export function withThemedStyles<P extends ThemedStyleProps<P>>(
  Component: React.ComponentType<P>,
  createStyles: (theme: ThemeShape) => StyleSheetShape,
) {
  type TExcept = Exclude<keyof P, keyof ThemedStyleProps<P>>;
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

export function withTheme<T extends ThemedProps<T>>(Component: ComponentType<T>) {
  type TExcept = Exclude<keyof T, keyof ThemedProps<T>>;
  type ForwardedProps = Pick<T, TExcept>;

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
