import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {
  ThemeType,
  StyleType,
} from '../theme';
import {
  ThemeMappingType,
  ComponentMappingType,
} from '../mapping';
import ThemeContext from '../theme/themeContext';
import MappingContext from '../mapping/mappingContext';
import {
  createStyle,
  getComponentMapping,
  StyleConsumerService,
} from '../../service';

interface PrivateProps<T> {
  forwardedRef: React.RefObject<T>;
}

interface ConsumerProps {
  mapping: ThemeMappingType;
  theme: ThemeType;
}

export interface Props {
  appearance?: string;
  theme?: ThemeType;
  themedStyle?: StyleType;
  requestStateStyle?: (state: string[]) => StyleType;
}

export const styled = <T extends React.Component, P extends object>(Component: React.ComponentClass<P>) => {

  type ComponentProps = Props & P;
  type WrapperProps = PrivateProps<T> & ComponentProps;

  class Wrapper extends React.Component<WrapperProps> {

    service: StyleConsumerService = new StyleConsumerService();

    getComponentName = (): string => Component.displayName || Component.name;

    createComponentStyle = (theme: ThemeType,
                            mapping: ComponentMappingType,
                            appearance: string,
                            variant: string[],
                            state: string[]): StyleType => {

      if (state.length === 0) {
        console.warn('Redundant `requestStateStyle` call! Use `this.props.themedStyle` instead!');
      }
      return createStyle(theme, mapping, appearance, variant, state);
    };

    createCustomProps = (props: ConsumerProps, componentProps: P & Props): Props => {
      const mapping = getComponentMapping(props.mapping, this.getComponentName());
      const variants = this.service.getVariantPropKeys<P & Props>(mapping, componentProps);

      return {
        appearance: componentProps.appearance,
        theme: props.theme,
        themedStyle: createStyle(props.theme, mapping, componentProps.appearance, variants),
        requestStateStyle: state => {
          return this.createComponentStyle(props.theme, mapping, componentProps.appearance, variants, state);
        },
      };
    };

    renderWrappedComponent = (props: ConsumerProps) => {
      // TS issue: with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
      const { forwardedRef, ...restProps } = this.props as PrivateProps<T>;
      const componentProps = restProps as P & Props;
      return (
        <Component
          ref={forwardedRef}
          {...this.createCustomProps(props, componentProps)}
          {...componentProps}
        />
      );
    };

    render() {
      return (
        <MappingContext.Consumer>{(mapping: ThemeMappingType) => (
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
