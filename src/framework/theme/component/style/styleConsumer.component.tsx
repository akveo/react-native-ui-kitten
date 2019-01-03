import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { MappingContext } from '../mapping';
import { ThemeContext } from '../theme';
import { StyleContext } from './styleContext';
import {
  APPEARANCE_DEFAULT,
  getComponentMapping,
} from '../../service/mapping';
import { StyleConsumerService } from '../../service/style';
import {
  ThemeMappingType,
  ThemeType,
  StyleType,
  Interaction,
  CreateStyleFunction,
} from '../../component';

interface PrivateProps<T> {
  forwardedRef: React.RefObject<T>;
}

interface ConsumerProps {
  mapping: ThemeMappingType;
  theme: ThemeType;
  createStyle: CreateStyleFunction;
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

      const appearance = componentProps.appearance || APPEARANCE_DEFAULT;

      const style = props.createStyle(
        this.getComponentName(),
        appearance,
        this.service.getVariantPropKeys(mapping, componentProps),
        this.service.getStatePropKeys(mapping, componentProps, this.state.interaction),
      );

      return {
        appearance: appearance,
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
          <ThemeContext.Consumer>{(theme: ThemeType) => (
            <StyleContext.Consumer>{(createStyle: CreateStyleFunction) => {
              return this.renderWrappedComponent({ createStyle: createStyle, mapping: mapping, theme: theme });
            }}</StyleContext.Consumer>
          )}</ThemeContext.Consumer>
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
