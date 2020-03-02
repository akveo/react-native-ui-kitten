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
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  RenderProp,
  TouchableWeb,
  TouchableWebProps,
  TouchableWebElement,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';

type TopNavigationActionStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | 'control' | string;
}>;

export interface TopNavigationActionProps extends TouchableWebProps, TopNavigationActionStyledProps {
  icon?: RenderProp<Partial<ImageProps>>;
}

export type TopNavigationActionElement = React.ReactElement<TopNavigationActionProps>;

/**
 * `TopNavigationAction` component is a part of the `TopNavigation`.
 * Top Navigation actions should be passed to in TopNavigation `accessory` properties to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `default`, `control`.
 * Default is `default`.
 *
 * @property {(style: ImageStyle) => ReactElement} icon - A function component
 * to render within the action.
 * Called with props provided by Eva.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example TopNavigationActionSimpleUsage
 *
 * @example TopNavigationActionExternalSourceIcon
 *
 * @example TopNavigationActionInlineStyling
 */
class TopNavigationActionComponent extends React.Component<TopNavigationActionProps> {

  static styledComponentName: string = 'TopNavigationAction';

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

  public onBlur = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  private onPress = (event: GestureResponderEvent): void => {
    if (this.props.onPress) {
      this.props.onPress(event);
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
        onPress={this.onPress}
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

export const TopNavigationAction = styled<TopNavigationActionProps>(TopNavigationActionComponent);
