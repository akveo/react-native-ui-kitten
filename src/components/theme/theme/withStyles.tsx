/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeContext } from './themeContext';
import {
  Styles,
  ThemeType,
} from '../style/styleSheet.service';

interface PrivateProps<T> {
  forwardedRef?: React.RefObject<T>;
}

export interface ThemedComponentProps {
  theme?: ThemeType;
  themedStyle?: Styles<any> | undefined;
}

export type ThemedComponentClass<P> = React.ComponentClass<ThemedComponentProps & P>;

interface PrivateProps<T> {
  forwardedRef?: React.RefObject<T>;
}

type CreateStylesFunction = (theme: ThemeType) => Styles<any>;

/**
 * `withStyles` is a High Order Function which is used to create themed style for non-styled component.
 * Basically used when need to use theme variable somewhere.
 * Returns component class which can be used as themed component.
 *
 * @property {ThemeType} theme - Determines theme used to style component.
 *
 * @property {Styles} themedStyle - Determines component style for it's current state.
 *
 * @param Component - Type: {ComponentType}. Determines class of component to be themed.
 *
 * @param createStyles - Type: {(theme: ThemeType) => Styles}. Determines arrow function used to create styles.
 *
 * @overview-example WithStylesSimpleUsage
 */
export const withStyles = <P extends object>(Component: React.ComponentType<P>,
                                             createStyles?: CreateStylesFunction): ThemedComponentClass<P> => {

  type WrappingProps = PrivateProps<WrappedElementInstance> & WrappedProps;
  type WrappedProps = ThemedComponentProps & P;
  type WrappingElement = React.ReactElement<WrappingProps>;
  type WrappedElementInstance = React.ReactInstance;

  class Wrapper extends React.Component<WrappingProps> {

    private withThemedProps = (props: P, theme: ThemeType): WrappedProps => {
      const themedStyle = createStyles && createStyles(theme);
      return { ...props, theme, themedStyle };
    };

    private renderWrappedElement = (theme: ThemeType): React.ReactElement<ThemedComponentProps> => {
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
