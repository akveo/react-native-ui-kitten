import React from 'react';
import {
  APPEARANCE_DEFAULT,
  ThemeMappingType,
  StyleMappingType,
} from 'eva/rk-kit';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { MappingContext } from '../mapping';
import { ThemeContext } from '../theme';
import {
  createThemedStyle,
  StyleConsumerService,
} from '../../service/style';
import {
  Interaction,
  ThemeType,
  StyleType,
} from '../../type';

interface PrivateProps<T> {
  forwardedRef: React.RefObject<T>;
}

export interface Props {
  appearance?: string;
  theme?: ThemeType;
  themedStyle?: StyleType;
  dispatch?: (interaction: Interaction[]) => void;
}

interface State {
  interaction: Interaction[];
}

export const styled = <T extends React.Component, P extends object>(Component: React.ComponentClass<P>) => {

  type ComponentProps = Props & P;
  type WrapperProps = PrivateProps<T> & ComponentProps;

  class Wrapper extends React.Component<WrapperProps, State> {

    service: StyleConsumerService = new StyleConsumerService();

    state: State = {
      interaction: [],
    };

    private onDispatch = (interaction: Interaction[]) => {
      this.setState({
        interaction: interaction,
      });
    };

    private createCustomProps = (mapping: ThemeMappingType, theme: ThemeType, componentProps: P & Props): Props => {
      const component: string = Component.displayName || Component.name;
      const appearance: string = componentProps.appearance || APPEARANCE_DEFAULT;

      const styleMapping: StyleMappingType = this.service.getComponentStyleMapping(
        mapping,
        component,
        componentProps,
        appearance,
        this.state.interaction,
      );

      const style: StyleType = createThemedStyle(styleMapping, theme);

      return {
        appearance: appearance,
        theme: theme,
        themedStyle: style,
        dispatch: this.onDispatch,
      };
    };

    renderWrappedComponent = (mapping: ThemeMappingType, theme: ThemeType) => {
      // TS issue: with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
      const { forwardedRef, ...restProps } = this.props as PrivateProps<T>;
      const componentProps = restProps as P & Props;

      return (
        <Component
          ref={forwardedRef}
          {...this.createCustomProps(mapping, theme, componentProps)}
          {...componentProps}
        />
      );
    };

    render() {
      return (
        <MappingContext.Consumer>{(mapping: ThemeMappingType) => (
          <ThemeContext.Consumer>{(theme: ThemeType) => {
            return this.renderWrappedComponent(mapping, theme);
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
