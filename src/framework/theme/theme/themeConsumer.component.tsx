/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeContext } from './themeContext';
import {
  StyleSheetType,
  ThemedStyleType,
  ThemeType,
} from './type';

interface PrivateProps<T> {
  forwardedRef?: React.RefObject<T>;
}

export interface ThemedComponentProps {
  theme?: ThemeType;
  themedStyle?: ThemedStyleType | undefined;
}

export type CreateStylesFunction = (theme: ThemeType) => StyleSheetType;

export interface Context {
  theme: ThemeType;
}

export type ThemedComponentClass<P> = React.ComponentClass<ThemedComponentProps & P>;

/**
 * The `withStyles` function is a High Order Function which is used to create themed style for non-styled component.
 * Basically used when need to use `theme` variables somewhere.
 *
 * Passes following props to `Component` when it is rendered:
 *
 * @property {ThemeType} theme - Determines theme used to style component.
 * @property {StyleType} themedStyle - Determines component style for it's current state.
 *
 * @param {React.ComponentClass} Component - Determines class of component to be themed
 * @param {(theme: ThemeType) => any} createStyles - Determines arrow function used to create styles
 *
 * @example Declaring Themed Component
 *
 * ```
 * import {
 *   withStyles,
 *   ThemedComponentProps,
 * } from '@kitten/theme';
 *
 * type ThemedButtonProps = ButtonProps & ThemedComponentProps;
 *
 * class Button extends React.Component<ThemedButtonProps> {
 *
 *   public render(): React.ReactElement<ButtonProps> {
 *     // Retrieve styles from props (provided with themedStyle prop)
 *     // And apply it with saving priority of `style` prop
 *
 *     const { style, themedStyle, ...restProps } = this.props;
 *
 *     return (
 *       <TouchableOpacity
 *         {...restProps}
 *         style={[themedStyle, style]}
 *       />
 *     );
 *   }
 * }
 *
 * export const ThemedButton = withStyles(Button, (theme: ThemeType) => ({
 *   backgroundColor: theme['color-primary-500'],
 * }));
 * ```
 *
 * @example Themed Component Usage
 *
 * ```
 * import {
 *  ThemedButton,
 *  ThemedButtonProps,
 * } from './path-to/themedButton.component';
 *
 * public render(): React.ReactElement<ThemedButtonProps> {
 *   return (
 *     <ThemedButton/>
 *   );
 * }
 * ```
 *
 * @returns {ThemedComponentClass} - component class which can be used as styled component
 */
export const withStyles = <P extends object>(Component: React.ComponentClass<P>,
                                             createStyles?: CreateStylesFunction): ThemedComponentClass<P> => {

  type WrappingProps = PrivateProps<WrappedElementInstance> & WrappedProps;
  type WrappedProps = ThemedComponentProps & P;
  type WrappingElement = React.ReactElement<WrappingProps>;
  type WrappedElement = React.ReactElement<WrappedProps>;
  type WrappedElementInstance = React.ReactInstance;

  class Wrapper extends React.Component<WrappingProps> {

    private withThemedProps = (source: P, context: Context): WrappedProps => {
      return {
        ...source,
        theme: context.theme,
        themedStyle: createStyles ? createStyles(context.theme) : undefined,
      };
    };

    private renderWrappedElement = (context: Context): WrappedElement => {
      const { forwardedRef, ...restProps } = this.props;
      const props: WrappedProps = this.withThemedProps(restProps as P, context);

      return (
        <Component
          {...props}
          ref={forwardedRef}
        />
      );
    };

    public render(): React.ReactNode {
      const ThemedElement = this.renderWrappedElement;

      return (
        <ThemeContext.Consumer>{(theme: ThemeType): React.ReactElement<P> => (
          <ThemedElement theme={theme}/>
        )}</ThemeContext.Consumer>
      );
    }
  }

  const WrappingElement = (props: WrappingProps, ref: React.Ref<WrappedElementInstance>): WrappingElement => {
    return (
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
