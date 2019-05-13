/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeContext } from './themeContext';
import {
  ThemeType,
  ThemedStyleType,
  StyleSheetType,
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

// `P` is for component-specific props which could be passed into jsx element
// `T` is for component-specific static props like `TabView.Tab`
export type ThemedComponentClass<P, T = {}> = React.ComponentClass<ThemedComponentProps & P> & T;

export const withStyles = <P, T = {}>(Component: React.ComponentClass<P>,
                                      createStyles?: CreateStylesFunction): ThemedComponentClass<P, T> => {

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
