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
  TargetedEvent,
} from 'react-native';
import {
  FalsyFC,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';

type TopNavigationActionStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default' | 'control'>;
}>;

export interface TopNavigationActionProps extends TouchableWebProps, TopNavigationActionStyledProps {
  icon?: RenderProp<Partial<ImageProps>>;
}

export type TopNavigationActionElement = React.ReactElement<TopNavigationActionProps>;

/**
 * A single action within the TopNavigation.
 * Actions should be rendered within TopNavigation by providing them through `accessory` props
 * to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {ReactElement | (ImageProps) => ReactElement} icon - Function component
 * to render within the action.
 * Expected to return an Image.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `default` and `control`.
 * Use *control* appearance when needed to display within a contrast container.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example TopNavigationActionSimpleUsage
 */
@styled('TopNavigationAction')
export class TopNavigationAction extends React.Component<TopNavigationActionProps> {

  public onBlur = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onBlur && this.props.onBlur(event);
  };

  private onMouseEnter = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
    this.props.onMouseEnter && this.props.onMouseEnter(event);
  };

  private onMouseLeave = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onMouseLeave && this.props.onMouseLeave(event);
  };

  private onFocus = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);
    this.props.onFocus && this.props.onFocus(event);
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
    this.props.onPressIn && this.props.onPressIn(event);
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);
    this.props.onPressOut && this.props.onPressOut(event);
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      iconTintColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
    } = source;

    return {
      container: {
        marginHorizontal: iconMarginHorizontal,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
      },
    };
  };

  public render(): TouchableWebElement {
    const { eva, style, icon, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWeb
        {...touchableProps}
        style={[evaStyle.container, style]}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <FalsyFC
          style={evaStyle.icon}
          component={icon}
        />
      </TouchableWeb>
    );
  }
}
