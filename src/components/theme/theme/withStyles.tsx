/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeContext } from './themeContext';
import { ThemeType } from './theme.service';
import { Styles } from '../style/style.service';
import { EvaProp } from '../style/styled';

interface PrivateProps<T> {
  forwardedRef?: React.RefObject<T>;
}

export interface ThemedComponentProps<T extends Styles<T> = any> {
  eva?: EvaProp;
}

export type ThemedComponentClass<P, S extends Styles<S>> = React.ComponentClass<ThemedComponentProps<S> & P>;

interface PrivateProps<T> {
  forwardedRef?: React.RefObject<T>;
}

type CreateStylesFunction<T extends Styles<T>> = (theme: ThemeType) => T;

/**
 * Accepts a component and a function to create a StyleSheet object with current theme
 * for injecting it into component props.
 * Injects `eva` property, which is `{ style }`, where style - a StyleSheet object mapped to current theme.
 *
 * @property {EvaProp} eva - Additional property injected to all `styled` components. Includes following properties:
 * `style` - styles provided by Eva,
 *
 * @param Component - Type: {ComponentType}. Component to be themed.
 *
 * @param createStyles - Type: {(ThemeType) => NamedStyles}. Function used to create styles mapped on theme.
 *
 * @overview-example WithStylesSimpleUsage
 */
export const withStyles = <P extends object, S>(Component: React.ComponentType<P>,
                                                createStyles?: CreateStylesFunction<S>): ThemedComponentClass<P, S> => {

  type WrappingProps = PrivateProps<WrappedElementInstance> & WrappedProps;
  type WrappedProps = ThemedComponentProps<S> & P;
  type WrappingElement = React.ReactElement<WrappingProps>;
  type WrappedElementInstance = React.ReactInstance;

  class Wrapper extends React.Component<WrappingProps> {

    private withThemedProps = (props: P, theme: ThemeType): WrappedProps => {
      const style = createStyles && createStyles(theme);
      return {
        ...props,
        eva: { style },
      };
    };

    private renderWrappedElement = (theme: ThemeType): React.ReactElement<ThemedComponentProps<S>> => {
      const { forwardedRef, ...restProps } = this.props;
      const props: WrappedProps = this.withThemedProps(restProps as P, theme);

      return (
        <Component
          {...props}
          ref={forwardedRef}
        />
      );
    };

    public render(): React.ReactElement {
      return (
        <ThemeContext.Consumer>
          {this.renderWrappedElement}
        </ThemeContext.Consumer>
      );
    }
  }

  const WrappingElement = (props: WrappingProps, ref: React.Ref<WrappedElementInstance>): WrappingElement => {
    return (
      // @ts-ignore
      <Wrapper
        {...props}
        forwardedRef={ref}
      />
    );
  };

  const ThemedComponent = React.forwardRef<WrappedElementInstance, WrappingProps>(WrappingElement);

  ThemedComponent.displayName = Component.displayName || Component.name;

  hoistNonReactStatics(ThemedComponent, Component);

  // @ts-ignore
  return ThemedComponent;
};
