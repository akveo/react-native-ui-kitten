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
} from './type';
import { MappingContext } from '../mapping/mappingContext';
import { ThemeContext } from '../theme/themeContext';
import { ThemeType } from '../theme/type';

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

export interface ContextProps {
  style: ThemeStyleType;
  theme: ThemeType;
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
 * @param Component - Type: {React.ComponentClass}. Determines class or functional component to be styled.
 *
 * @overview-example Declaring Styled Component
 *
 * ```
 * import React from 'react';
 * import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
 * import { styled, StyledComponentProps, Interaction } from 'react-native-ui-kitten';
 *
 * type StyledButtonProps = TouchableOpacityProps & StyledComponentProps;
 *
 * class Button extends React.Component<StyledButtonProps> {
 *
 *   // Define component name used in `mapping`
 *   static styledComponentName: string = 'Button';
 *
 *   private onPressIn = (e: GestureResponderEvent) => {
 *     // Request styles for `active` state and re-render
 *
 *     this.props.dispatch([Interaction.ACTIVE]);
 *
 *     if(this.props.onPressIn) {
 *       this.props.onPressIn(e);
 *     }
 *   };
 *
 *   private onPressOut = (e: GestureResponderEvent) => {
 *     // Request styles for default state and re-render
 *
 *     this.props.dispatch([]);
 *
 *     if(this.props.onPressOut) {
 *       this.props.onPressOut(e);
 *     }
 *   };
 *
 *   public render(): React.ReactElement<ButtonProps> {
 *     // Retrieve styles for current state from props (provided with themedStyle prop)
 *     // And apply it with saving priority of `style` prop
 *
 *     const { style, themedStyle, ...restProps } = this.props;
 *
 *     return (
 *       <TouchableOpacity
 *         {...restProps}
 *         style={[themedStyle, style]}
 *         onPressIn={this.onPressIn}
 *         onPressOut={this.onPressOut}
 *       />
 *     );
 *   }
 * }
 *
 * export const StyledButton = styled<StyledButtonProps>(Button);
 * ```
 *
 * @overview-example Styled Component Usage
 *
 * ```
 * import React from 'react';
 * import {
 *   StyledButton,
 *   StyledButtonProps,
 * } from './path-to/styledButton.component';
 *
 * export const StyledButtonShowcase = (props?: StyledButtonProps): React.ReactElement<StyledButtonProps> => {
 *   return (
 *     <StyledButton {...props}/>
 *   );
 * };
 * ```
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

    private onInit = (context: ContextProps) => {

      // @ts-ignore
      this.service = new StyleConsumerService(Component.styledComponentName, context);
      this.defaultProps = this.service.createDefaultProps();

      this.init = true;
    };

    private onDispatch = (interaction: Interaction[]) => {
      this.setState({ interaction });
    };

    private withStyledProps = (source: P, context: ContextProps): WrappedProps => {
      const { interaction } = this.state;

      const props: WrappingProps = { ...this.defaultProps, ...source };

      return this.service.withStyledProps(props, context, interaction);
    };

    private renderWrappedElement = (context: ContextProps): WrappedElement => {
      if (!this.init) {
        this.onInit(context);
      }

      const { forwardedRef, ...restProps } = this.props;
      const props: P & StyledComponentProps = this.withStyledProps(restProps as P, context);

      return (
        <Component
          {...props}
          ref={forwardedRef}
          dispatch={this.onDispatch}
        />
      );
    };

    public render(): React.ReactNode {
      const StyledElement = this.renderWrappedElement;

      return (
        <MappingContext.Consumer>{(styles: ThemeStyleType): WrappedElement => (
          <ThemeContext.Consumer>{(theme: ThemeType): WrappedElement => (
            <StyledElement style={styles} theme={theme}/>
          )}</ThemeContext.Consumer>
        )}</MappingContext.Consumer>
      );
    }
  }

  const WrappingElement = (props: WrappingProps, ref: React.Ref<WrappedElementInstance>): WrappingElement => {
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
