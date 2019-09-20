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
import { createThemedStyle } from '../style/style.service';
import { StyleType } from '@kitten/theme';

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
 * `withStyles` is a High Order Function which is used to create themed style for non-styled component.
 * Basically used when need to use theme variable somewhere.
 * Returns component class which can be used as themed component.
 *
 * @property {ThemeType} theme - Determines theme used to style component.
 *
 * @property {StyleType} themedStyle - Determines component style for it's current state.
 *
 * @param Component - Type: {React.ComponentClass}. Determines class of component to be themed.
 *
 * @param createStyles - Type: {(theme: ThemeType) => any}. Determines arrow function used to create styles.
 *
 * @overview-example Declaring Themed Component
 *
 * ```
 * import React from 'react';
 * import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
 * import { withStyles, ThemedComponentProps } from 'react-native-ui-kitten';
 *
 * type ThemedButtonProps = TouchableOpacityProps & ThemedComponentProps;
 *
 * class Button extends React.Component<ThemedButtonProps> {
 *
 *   public render(): React.ReactElement<TouchableOpacityProps> {
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
 *   backgroundColor: theme['color-primary-default'],
 * }));
 * ```
 *
 * @overview-example Themed Component Usage
 *
 * ```
 * import React from 'react';
 * import {
 *   ThemedButton,
 *   ThemedButtonProps,
 * } from './path-to/themedButton.component';
 *
 * export const ThemedButtonShowcase = (props?: ThemedButtonProps): React.ReactElement<ThemedButtonProps> => {
 *   return (
 *     <ThemedButton {...props}/>
 *   );
 * };
 * ```
 */

export const withStyles = <P extends object>(Component: React.ComponentType<P>,
                                             createStyles?: CreateStylesFunction): ThemedComponentClass<P> => {

  type WrappingProps = PrivateProps<WrappedElementInstance> & WrappedProps;
  type WrappedProps = ThemedComponentProps & P;
  type WrappingElement = React.ReactElement<WrappingProps>;
  type WrappedElement = React.ReactElement<WrappedProps>;
  type WrappedElementInstance = React.ReactInstance;

  class Wrapper extends React.Component<WrappingProps> {

    private createThemedStyles = (style: ThemedStyleType, theme: ThemeType): ThemedStyleType => {
      return Object.keys(style).reduce((acc: StyleType, current: string): ThemedStyleType => {
        return { ...acc, [current]: createThemedStyle(style[current], theme) };
      }, {});
    };

    private withThemedProps = (source: P, context: Context): WrappedProps => {
      const style: ThemedStyleType = createStyles ? createStyles(context.theme) : {};

      return {
        ...source,
        theme: context.theme,
        themedStyle: this.createThemedStyles(style, context.theme),
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
      // @ts-ignore

      <Wrapper
        {...props}
        forwardedRef={ref}
      />
    );
  };

  const ThemedComponent = React.forwardRef<WrappedElementInstance, WrappingProps>(WrappingElement);

  ThemedComponent.displayName = Component.displayName || Component.name;

  // @ts-ignore
  hoistNonReactStatics(ThemedComponent, Component);

  // @ts-ignore
  return ThemedComponent;
};
