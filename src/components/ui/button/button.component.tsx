/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  EvaSize,
  EvaStatus,
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type ButtonStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'filled' | 'outline' | 'ghost' | string;
}>;

export interface ButtonProps extends TouchableWebProps, ButtonStyledProps {
  children?: RenderProp<TextProps> | React.ReactText;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  status?: EvaStatus;
  size?: EvaSize;
}

export type ButtonElement = React.ReactElement<ButtonProps>;

/**
 * Styled `Button` component.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `filled`, `outline` or `ghost`.
 * Default is `filled`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `primary`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Default is `medium`.
 *
 * @property {ReactText | (props: TextProps) => ReactElement} children - A string or a function component
 * to render within the button.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryLeft - A function component
 * to render to start of the text.
 * Called with props provided by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryRight - A function component
 * to render to end of the text.
 * Called with props provided by Eva.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example ButtonSimpleUsage
 *
 * @overview-example ButtonStates
 *
 * @overview-example ButtonAppearances
 *
 * @overview-example ButtonStatus
 *
 * @overview-example ButtonSize
 *
 * @overview-example ButtonOutline
 *
 * @overview-example ButtonGhost
 *
 * @overview-example ButtonWithIcon
 */
export class ButtonComponent extends React.Component<ButtonProps> {

  static styledComponentName: string = 'Button';

  private onMouseEnter = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  private onMouseLeave = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  private onFocus = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  private onBlur = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      textColor,
      textFontFamily,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textMarginHorizontal,
      iconWidth,
      iconHeight,
      iconTintColor,
      iconMarginHorizontal,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      text: {
        color: textColor,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        marginHorizontal: textMarginHorizontal,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
        marginHorizontal: iconMarginHorizontal,
      },
    };
  };

  public render(): TouchableWebElement {
    const { eva, style, accessoryLeft, accessoryRight, children, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWeb
        {...touchableProps}
        style={[evaStyle.container, styles.container, style]}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <FalsyFC
          style={evaStyle.icon}
          component={accessoryLeft}
        />
        <FalsyText
          style={evaStyle.text}
          component={children}
        />
        <FalsyFC
          style={evaStyle.icon}
          component={accessoryRight}
        />
      </TouchableWeb>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Button = styled<ButtonProps>(ButtonComponent);
