import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ThemeType,
  ThemedStyleType,
  StyleSheetType,
} from './type';
import {
  Consumer,
  forwardProps,
} from '../service';

export interface Props<P> extends React.ClassAttributes<P> {
  theme: ThemeType;
  themedStyle: ThemedStyleType;
}

export function withThemedStyles<P extends Props<P>>(
  Component: React.ComponentType<P>,
  createStyles: (theme: ThemeType) => StyleSheetType,
) {
  type TExcept = Exclude<keyof P, keyof Props<P>>;
  type ForwardedProps = Pick<P, TExcept>;

  class Shadow extends React.Component<ForwardedProps> {
    wrappedComponentRef = undefined;
    getWrappedInstance = undefined;

    setWrappedComponentRef = (ref) => {
      this.wrappedComponentRef = ref;
    };

    renderWrappedComponent = (theme: ThemeType) => {
      const styles = StyleSheet.create(createStyles(theme));
      return (
        <Component
          ref={this.setWrappedComponentRef}
          theme={theme}
          themedStyle={styles}
          {...this.props}
        />
      );
    };

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
