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
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: StyleType) => IconElement;

interface ComponentProps {
  icon: IconProp;
}

export type TopNavigationActionProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;
export type TopNavigationActionElement = React.ReactElement<TopNavigationActionProps>;

/**
 * The `TopNavigationAction` component is a part of the `TopNavigation` component.
 * `TopNavigationActions` should be used in `TopNavigation` to provide usable component.
 * See usage examples at `TopNavigation` component documentation.
 *
 * @extends React.Component
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines the icon of the tab.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 */

class TopNavigationActionComponent extends React.Component<TopNavigationActionProps> {

  static styledComponentName: string = 'TopNavigationAction';

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
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
        tintColor: iconTintColor,
        width: iconWidth,
        height: iconHeight,
        ...styles.icon,
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

  private renderIconElement = (style: StyleType): IconElement => {
    return this.props.icon(style);
  };

  public render(): React.ReactNode {
    const { themedStyle, style, icon, ...touchableProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const hitSlopInsets: Insets = this.createHitSlopInsets(componentStyle.icon);

    const iconElement: IconElement = this.renderIconElement(componentStyle.icon);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        hitSlop={hitSlopInsets}
        {...touchableProps}
        style={[componentStyle.container, styles.container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {iconElement}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  icon: {},
});

export const TopNavigationAction = styled<TopNavigationActionProps>(TopNavigationActionComponent);
