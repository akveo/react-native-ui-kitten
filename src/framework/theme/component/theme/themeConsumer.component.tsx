import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {
  ThemeContext,
  ThemeContextValueType,
} from './themeContext';
import {
  ThemeType,
  ThemedStyleType,
  StyleSheetType,
} from '../../type';

interface PrivateProps<T> {
  forwardedRef: React.RefObject<T>;
}

export interface Props {
  theme?: ThemeType;
  themedStyle?: ThemedStyleType | undefined;
}

export type CreateStylesFunction = (theme: ThemeType) => StyleSheetType;

export const withStyles = <T extends React.Component, P extends object>(Component: React.ComponentClass<P>,
                                                                        createStyles?: CreateStylesFunction) => {

  type ComponentProps = Props & P;
  type WrapperProps = PrivateProps<T> & ComponentProps;

  class Wrapper extends React.Component<WrapperProps> {

    private createConsumerProps = (theme: ThemeContextValueType): Props => {
      return {
        theme: theme,
        themedStyle: createStyles ? createStyles(theme) : undefined,
      };
    };

    private createWrappedComponent = (theme: ThemeContextValueType): React.ReactElement<P> => {
      // TS issue: with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
      const { forwardedRef, ...restProps } = this.props as PrivateProps<T>;

      const derivedProps: P & Props = restProps as P & Props;
      const consumerProps: Props = this.createConsumerProps(theme);

      return (
        <Component
          ref={forwardedRef}
          {...consumerProps}
          {...derivedProps}
        />
      );
    };

    public render(): React.ReactNode {
      return (
        <ThemeContext.Consumer>{(theme: ThemeType): React.ReactElement<P> => {
          return this.createWrappedComponent(theme);
        }}</ThemeContext.Consumer>
      );
    }
  }

  const createComponent = (props: WrapperProps, ref: T): React.ReactElement<WrapperProps> => (
    <Wrapper {...props} forwardedRef={ref}/>
  );

  const ThemedComponent = React.forwardRef<T, P>(createComponent as any);

  ThemedComponent.displayName = Component.displayName || Component.name;
  hoistNonReactStatics(ThemedComponent, Component);

  return ThemedComponent;
};
