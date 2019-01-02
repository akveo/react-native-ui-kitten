import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeMappingType } from '../mapping';
import {
  ThemeType,
  StyleType,
} from '../theme';
import ThemeContext from '../theme/themeContext';
import MappingContext from '../mapping/mappingContext';
import {
  createStyle,
  StyleConsumerService,
} from '../../service/style';
import { getComponentMapping } from '../../service/mapping';
import { Interaction } from './type';

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

    private getComponentName = (): string => Component.displayName || Component.name;

    private createCustomProps = (props: ConsumerProps, componentProps: P & Props): Props => {
      const mapping = getComponentMapping(props.mapping, this.getComponentName());

      const style = createStyle(
        props.theme,
        mapping,
        componentProps.appearance,
        this.service.getVariantPropKeys(mapping, componentProps),
        this.service.getStatePropKeys(mapping, componentProps, this.state.interaction),
      );

      return {
        appearance: componentProps.appearance,
        theme: props.theme,
        themedStyle: style,
        dispatch: this.onDispatch,
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
