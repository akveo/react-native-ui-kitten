import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import ThemeContext from './themeContext';
import {
  ThemeType,
  ThemedStyleType,
  StyleSheetType,
} from './type';

interface PrivateProps<T> {
  forwardedRef: React.RefObject<T>;
}

interface ConsumerProps {
  theme: ThemeType;
}

export interface Props {
  theme: ThemeType;
  themedStyle: ThemedStyleType | undefined;
}

export type CreateStylesFunction = (theme: ThemeType) => StyleSheetType;

export const withStyles = <T extends React.Component, P extends object>(Component: React.ComponentClass<P>,
                                                                        createStyles?: CreateStylesFunction) => {

  type ComponentProps = Props & P;
  type WrapperProps = PrivateProps<T> & ComponentProps;

  class Wrapper extends React.Component<WrapperProps> {

    createCustomProps = (props: ConsumerProps): Props => {
      return ({
        theme: props.theme,
        themedStyle: createStyles ? createStyles(props.theme) : undefined,
      });
    };

    renderWrappedComponent = (props: ConsumerProps) => {
      // TS issue: with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
      const { forwardedRef, ...restProps } = this.props as PrivateProps<T>;
      const componentProps = restProps as P & Props;
      return (
        <Component
          ref={forwardedRef}
          {...this.createCustomProps(props)}
          {...componentProps}
        />
      );
    };

    render() {
      return (
        <ThemeContext.Consumer>{(theme: ThemeType) => {
          return this.renderWrappedComponent({theme: theme});
        }}</ThemeContext.Consumer>
      );
    }
  }

  const RefForwardingFactory = (props: WrapperProps, ref: T) => {
    return (
      <Wrapper {...props} forwardedRef={ref}/>
    );
  };

  const RefForwardingComponent = React.forwardRef<T, P>(RefForwardingFactory as any);

  RefForwardingComponent.displayName = Component.displayName || Component.name;
  hoistNonReactStatics(RefForwardingComponent, Component);

  return RefForwardingComponent;
};
