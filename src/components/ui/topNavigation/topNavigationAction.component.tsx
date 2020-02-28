/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  ImageStyle,
  Insets,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  RenderProp,
  TouchableWithoutFeedback,
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
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

export interface TopNavigationActionProps extends TouchableOpacityProps, TopNavigationActionStyledProps {
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
class TopNavigationActionComponent extends React.Component<TopNavigationActionProps>
  implements WebEventResponderCallbacks {

  static styledComponentName: string = 'TopNavigationAction';

  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
  };

  public onMouseLeave = (): void => {
    this.props.eva.dispatch([]);
  };

  public onFocus = (): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);
  };

  public onBlur = (): void => {
    this.props.eva.dispatch([]);
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

  private createHitSlopInsets = (iconStyle: StyleProp<ImageStyle>): Insets => {
    const flatStyle: ImageStyle = StyleSheet.flatten(iconStyle);

    // @ts-ignore: `width` is restricted to be a number
    const value: number = 40 - flatStyle.width;

    return {
      left: value,
      top: value,
      right: value,
      bottom: value,
    };
  };

  public render(): React.ReactNode {
    const { eva, style, icon, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);
    const hitSlopInsets: Insets = this.createHitSlopInsets(evaStyle.icon);

    return (
      <TouchableWithoutFeedback
        hitSlop={hitSlopInsets}
        {...touchableProps}
        {...this.webEventResponder.eventHandlers}
        style={[evaStyle.container, webStyles.container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <FalsyFC
          style={evaStyle.icon}
          component={icon}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const webStyles = Platform.OS === 'web' && StyleSheet.create({
  container: {
    // @ts-ignore
    outlineWidth: 0,
  },
});

export const TopNavigationAction = styled<TopNavigationActionProps>(TopNavigationActionComponent);
