import React from 'react';
import { StyleSheet } from 'react-native';
import ThemeContext from './themeContext';
import {
  ThemeType,
  ThemedStyleType,
  StyleSheetType,
} from './type';
import { forwardProps } from '../../service';

export interface Props<P> extends React.ClassAttributes<P> {
  theme: ThemeType;
  themedStyle: ThemedStyleType | undefined;
}

export function withTheme<P extends Props<P>>(
  Component: React.ComponentType<P>,
  createStyles?: (theme: ThemeType) => StyleSheetType,
) {
  type TExcept = Exclude<keyof P, keyof Props<P>>;
  type ForwardedProps = Pick<P, TExcept>;

  class Shadow extends React.Component<ForwardedProps> {
    wrappedComponentRef = undefined;
    getWrappedInstance = undefined;

    setWrappedComponentRef = (ref) => {
      this.wrappedComponentRef = ref;
    };

    createThemedStyle = (theme: ThemeType): ThemedStyleType | undefined => {
      return createStyles ? StyleSheet.create(createStyles(theme)) : undefined;
    };

    renderWrappedComponent = (theme: ThemeType) => (
      <Component
        ref={this.setWrappedComponentRef}
        theme={theme}
        themedStyle={this.createThemedStyle(theme)}
        {...this.props}
      />
    );

    render() {
      return (
        <ThemeContext.Consumer>
          {this.renderWrappedComponent}
        </ThemeContext.Consumer>
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
