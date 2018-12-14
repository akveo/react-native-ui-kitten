import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {
  ThemeType,
  StyleType,
} from '../theme';
import { ThemeMappingType } from '../mapping';
import ThemeContext from '../theme/themeContext';
import MappingContext from '../mapping/mappingContext';
import {
  createStyle,
  getComponentThemeMapping,
} from '../../service';

interface PrivateProps<T> {
  forwardedRef: React.RefObject<T>;
}

interface ConsumerProps {
  mapping: ThemeMappingType[];
  theme: ThemeType;
}

export interface Props {
  variant?: string;
  theme?: ThemeType;
  themedStyle?: StyleType;
  requestStateStyle?: (state: string[] | string) => StyleType;
}

export const StyledComponent = <T extends React.Component, P extends object>(Component: React.ComponentClass<P>) => {

  type ComponentProps = Props & P;
  type WrapperProps = PrivateProps<T> & ComponentProps;

  class Wrapper extends React.Component<WrapperProps> {

    getComponentName = (): string => Component.displayName || Component.name;

    createStyle = (theme: ThemeType,
                   mapping: ThemeMappingType,
                   variant: string[] | string,
                   state: string[] | string): StyleType => {

      if (state.length === 0) {
        console.warn('Redundant `requestStateStyle` call! Use `this.props.themedStyle` instead!');
      }
      return createStyle(theme, mapping, variant, state);
    };

    createCustomProps = (props: ConsumerProps, variant: string): Props => {
      const mapping = getComponentThemeMapping(this.getComponentName(), props.mapping);
      return {
        variant: variant,
        theme: props.theme,
        themedStyle: createStyle(props.theme, mapping, variant),
        requestStateStyle: state => this.createStyle(props.theme, mapping, variant, state),
      };
    };

    renderWrappedComponent = (props: ConsumerProps) => {
      // TS issue: with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
      const { forwardedRef, ...restProps } = this.props as PrivateProps<T>;
      const componentProps = restProps as P & Props;
      return (
        <Component
          ref={forwardedRef}
          {...this.createCustomProps(props, componentProps.variant)}
          {...componentProps}
        />
      );
    };

    render() {
      return (
        <MappingContext.Consumer>{(mapping: ThemeMappingType[]) => (
          <ThemeContext.Consumer>{(theme: ThemeType) => {
            return this.renderWrappedComponent({ mapping: mapping, theme: theme });
          }}</ThemeContext.Consumer>
        )}</MappingContext.Consumer>
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
