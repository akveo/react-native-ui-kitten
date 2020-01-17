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

export interface StyledComponentProps {
  appearance?: string;
  theme?: ThemeType;
  themedStyle?: StyleType;
  dispatch?: (interaction: Interaction[]) => void;
}

interface State {
  interaction: Interaction[];
}

export type StyledComponentClass<P> = React.ComponentClass<StyledComponentProps & P>;

/**
 * `styled` is a High Order Function which is used to apply style mapping on component.
 *
 * Requires component to have `styledComponentName` string property which defines
 * corresponding component name in mapping. (e.g 'Button' for Button component).
 * Returns component class which can be used as styled component.
 *
 * @property {string} appearance - Determines style appearance of component. Default is provided by mapping.
 *
 * @property {ThemeType} theme - Determines theme used to style component.
 *
 * @property {StyleType} themedStyle - Determines component style for it's current state.
 *
 * @property {(interaction: Interaction[]) => void} dispatch - Determines function
 * for dispatching current state of component. This is designed to be used as style request function.
 * Calls component re-render if style for requested state differ from current.
 *
 * @param Component - Type: {ComponentType}. Determines class or functional component to be styled.
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

    private withStyledProps = (source: P,
                               style: ThemeStyleType,
                               theme: ThemeType): WrappedProps => {
      const { interaction } = this.state;

      const props: WrappingProps = { ...this.defaultProps, ...source };

      return this.service.withStyledProps(props, style, theme, interaction);
    };

    private renderWrappedElement = (style: ThemeStyleType, theme: ThemeType): WrappedElement => {
      if (!this.init) {
        this.onInit(style, theme);
      }

      const { forwardedRef, ...restProps } = this.props;
      const props: P & StyledComponentProps = this.withStyledProps(restProps as P, style, theme);

      return (
        <Component
          {...props}
          ref={forwardedRef}
          dispatch={this.onDispatch}
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

  // @ts-ignore
  hoistNonReactStatics(ResultComponent, Component);

  // @ts-ignore
  return ResultComponent;
};
