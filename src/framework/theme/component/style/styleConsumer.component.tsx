import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { StyleMappingType } from 'eva/packages/common';
import {
  MappingContext,
  MappingContextValueType,
} from '../mapping';
import {
  ThemeContext,
  ThemeContextValueType,
} from '../theme';
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

    private service: StyleConsumerService = new StyleConsumerService();

    public state: State = {
      interaction: [],
    };

    private onDispatch = (interaction: Interaction[]) => {
      this.setState({
        interaction: interaction,
      });
    };

    private createConsumerProps = (mappingValue: MappingContextValueType,
                                   themeValue: ThemeContextValueType,
                                   derivedProps: P & Props): Props => {

      const component: string = Component.displayName || Component.name;
      const appearance: string = derivedProps.appearance;

      const styleMapping: StyleMappingType = this.service.getComponentStyleMapping(
        mappingValue.mapping,
        mappingValue.styles,
        component,
        derivedProps,
        this.state.interaction,
      );

      const style: StyleType = createThemedStyle(styleMapping, themeValue);

      return {
        appearance: appearance,
        theme: themeValue,
        themedStyle: style,
        dispatch: this.onDispatch,
      };
    };

    private createWrappedComponent = (mapping: MappingContextValueType, theme: ThemeType): React.ReactElement<P> => {
      // TS issue: with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
      const { forwardedRef, ...restProps } = this.props as PrivateProps<T>;

      const defaultProps: Props = {
        appearance: 'default',
      };

      const derivedProps: P & Props = {
        ...defaultProps,
        ...(restProps as P & Props),
      };

      const consumerProps: Props = this.createConsumerProps(mapping, theme, derivedProps);

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
        <MappingContext.Consumer>{(mapping: MappingContextValueType): React.ReactElement<P> => (
          <ThemeContext.Consumer>{(theme: ThemeContextValueType): React.ReactElement<P> => {
            return this.createWrappedComponent(mapping, theme);
          }}</ThemeContext.Consumer>
        )}</MappingContext.Consumer>
      );
    }
  }

  const createComponent = (props: WrapperProps, ref: T): React.ReactElement<WrapperProps> => (
    <Wrapper {...props} forwardedRef={ref}/>
  );

  const StyledComponent = React.forwardRef<T, P>(createComponent as any);

  StyledComponent.displayName = Component.displayName || Component.name;
  hoistNonReactStatics(StyledComponent, Component);

  return StyledComponent;
};
