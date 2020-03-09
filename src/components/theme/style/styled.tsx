/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeStyleType } from '@eva-design/dss';
import { StyleConsumerService } from './styleConsumer.service';
import {
  Interaction,
  StyleType,
} from './style.service';
import { MappingContext } from '../mapping/mappingContext';
import { ThemeContext } from '../theme/themeContext';
import { ThemeType } from '../theme/theme.service';

interface PrivateProps<T> {
  forwardedRef?: React.Ref<T>;
}

export interface EvaProp {
  theme?: ThemeType;
  style?: StyleType;
  dispatch?: (interaction: Interaction[]) => void;
}

export interface StyledComponentProps {
  appearance?: string;
  eva?: EvaProp;
}

interface State {
  interaction: Interaction[];
}

export type StyledComponentClass<P> = React.ComponentClass<StyledComponentProps & P>;

/**
 * High Order Function to apply style mapping on a component.
 * Used by all UI Kitten components and can be used when building custom components with Eva.
 *
 * Requires component to have a static `styledComponentName` property which defines
 * corresponding component name in mapping.
 *
 * Injects `eva` property into component props, which is `{ theme, style, dispatch }`.
 * Current theme, styles provided by Eva and dispatch function to request styles for a particular state.
 *
 * @property {string} appearance - Appearance of component. Default is provided by mapping.
 *
 * @property {EvaProp} eva - Additional property injected to all `styled` components. Includes following properties:
 * `theme` - current theme,
 * `style` - style provided by Eva,
 * `dispatch` - Function for requesting styles from Eva for current component state.
 *
 * @param Component - Type: {ComponentType}. Component to be styled.
 *
 * @overview-example StyledComponentSimpleUsage
 *
 * @overview-example StyledComponentStates
 *
 * @overview-example StyledComponentVariants
 */
export const styled = <P extends object>(Component: React.ComponentType<P>): StyledComponentClass<P> => {

  // @ts-ignore
  if (!Component.styledComponentName) {
    console.warn('Styled components should specify corresponding style name.');
    return null;
  }

  type WrappingProps = PrivateProps<WrappedElementInstance> & WrappedProps;
  type WrappedProps = StyledComponentProps & P;
  type WrappingElement = React.ReactElement<WrappingProps>;
  type WrappedElement = React.ReactElement<WrappedProps>;
  type WrappedElementInstance = React.ReactInstance;

  class Wrapper extends React.Component<WrappingProps, State> {

    public state: State = {
      interaction: [],
    };

    private init: boolean = false;

    // Yes. This is not static because it is calculated once we got some meta from style context.
    private defaultProps: StyledComponentProps;
    private service: StyleConsumerService;

    private onInit = (style: ThemeStyleType, theme: ThemeType): void => {
      // @ts-ignore
      this.service = new StyleConsumerService(Component.styledComponentName, style, theme);
      this.defaultProps = this.service.createDefaultProps();

      this.init = true;
    };

    private onDispatch = (interaction: Interaction[]): void => {
      this.setState({ interaction });
    };

    private withEvaProp = (sourceProps: P,
                           sourceStyle: ThemeStyleType,
                           theme: ThemeType): WrappedProps => {

      const props: WrappingProps = { ...this.defaultProps, ...sourceProps };
      const style: StyleType = this.service.createStyleProp(props, sourceStyle, theme, this.state.interaction);

      return {
        ...props,
        eva: {
          theme,
          style,
          dispatch: this.onDispatch,
        },
      };
    };

    private renderWrappedElement = (style: ThemeStyleType, theme: ThemeType): WrappedElement => {
      if (!this.init) {
        this.onInit(style, theme);
      }

      const { forwardedRef, ...restProps } = this.props;

      return (
        <Component
          {...this.withEvaProp(restProps as P, style, theme)}
          ref={forwardedRef}
        />
      );
    };

    public render(): React.ReactNode {
      return (
        <MappingContext.Consumer>{(style: ThemeStyleType): WrappedElement => (
          <ThemeContext.Consumer>{(theme: ThemeType): WrappedElement => {
            return this.renderWrappedElement(style, theme);
          }}</ThemeContext.Consumer>
        )}</MappingContext.Consumer>
      );
    }
  }

  const WrappingElement = (props: WrappingProps,
                           ref: React.Ref<WrappedElementInstance>): WrappingElement => {
    return (
      // @ts-ignore

      <Wrapper
        {...props}
        forwardedRef={ref}
      />
    );
  };

  const ResultComponent = React.forwardRef<WrappedElementInstance, WrappingProps>(WrappingElement);

  ResultComponent.displayName = Component.displayName || Component.name;

  hoistNonReactStatics(ResultComponent, Component);

  // @ts-ignore
  return ResultComponent;
};
