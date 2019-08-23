/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ImageProps,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { TouchableIndexedProps } from '../support/typings/type';
import { allWithPrefix } from '../support/services';

type IconElement = React.ReactElement<ImageProps>;

export interface MenuItemType {
  title: string;
  disabled?: boolean;
  subItems?: MenuItemType[];
  titleStyle?: StyleProp<TextStyle>;
  menuIndex?: number;
  icon?: (style: StyleType) => IconElement;
  accessory?: (style: StyleType) => IconElement;
}

interface ComponentProps extends MenuItemType {
  selected?: boolean;
}

export type MenuItemProps = StyledComponentProps & ComponentProps & TouchableIndexedProps;
export type MenuItemElement = React.ReactElement<MenuItemProps>;

/**
 * `MenuItem` is a support component for `Menu`.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the ListItem.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes title style.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} accessory - Determines the accessory of the
 * component.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines the icon of the component.
 *
 * @property {MenuItemType[]} subItems - Determines the sub-items of the MenuItem.
 *
 * @property {(index: number, event: GestureResponderEvent) => void} onPress - Emits when component is pressed.
 *
 * @property StyledComponentProps
 *
 * @property TouchableTypeReturningProps<MenuItemType>
 * */

class MenuItemComponent extends React.Component<MenuItemProps> {

  static styledComponentName: string = 'MenuItem';

  private onPress = (event: GestureResponderEvent) => {
    const { onPress, menuIndex } = this.props;

    if (onPress) {
      onPress(menuIndex, event);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    const { onPressIn, menuIndex, dispatch } = this.props;

    dispatch([Interaction.ACTIVE]);

    if (onPressIn) {
      onPressIn(menuIndex, event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    const { onPressOut, menuIndex, dispatch } = this.props;

    dispatch([]);

    if (onPressOut) {
      onPressOut(menuIndex, event);
    }
  };

  private onLongPress = (event: GestureResponderEvent) => {
    const { onLongPress, menuIndex } = this.props;

    if (onLongPress) {
      onLongPress(menuIndex, event);
    }
  };

  private getComponentStyles = (style: StyleType): StyleType => {
    const {
      paddingHorizontal,
      paddingVertical,
      backgroundColor,
    } = style;
    const titleStyles: StyleType = allWithPrefix(style, 'title');
    const indicatorStyles: StyleType = allWithPrefix(style, 'indicator');
    const iconStyles: StyleType = allWithPrefix(style, 'icon');
    const accessoryStyle: StyleType = allWithPrefix(style, 'accessory');

    return {
      container: {
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        backgroundColor: backgroundColor,
      },
      title: {
        marginHorizontal: titleStyles.titleMarginHorizontal,
        fontSize: titleStyles.titleFontSize,
        fontWeight: titleStyles.titleFontWeight,
        lineHeight: titleStyles.titleLineHeight,
        color: titleStyles.titleColor,
      },
      indicator: {
        width: indicatorStyles.indicatorWidth,
        backgroundColor: indicatorStyles.indicatorBackgroundColor,
      },
      icon: {
        width: iconStyles.iconWidth,
        height: iconStyles.iconHeight,
        marginHorizontal: iconStyles.iconMarginHorizontal,
        tintColor: iconStyles.iconTintColor,
      },
    };
  };

  private renderIcon = (style: StyleType): IconElement => {
    const { icon } = this.props;

    return icon(style);
  };

  private renderTitle = (style: StyleType): TextElement => {
    const { title, titleStyle } = this.props;

    return (
      <Text style={[style, titleStyle]}>{title}</Text>
    );
  };

  private renderAccessory = (style: StyleType): IconElement => {
    const { accessory } = this.props;

    return accessory(style);
  };

  private renderComponentChildren = (style: StyleType): [IconElement, TextElement, IconElement] => {
    const { title, icon, accessory } = this.props;

    return [
      icon && this.renderIcon(style.icon),
      title && this.renderTitle(style.title),
      accessory && this.renderAccessory(style.icon),
    ];
  };

  public render(): React.ReactNode {
    const { themedStyle, style, ...restProps } = this.props;
    const { container, indicator, ...restStyles } = this.getComponentStyles(themedStyle);
    const [iconElement, textElement, accessoryElement] = this.renderComponentChildren(restStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...restProps}
        style={[styles.container, container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onLongPress={this.onLongPress}>
        <View style={[styles.indicator, indicator]}/>
        <View style={styles.subContainer}>
          {iconElement}
          {textElement}
        </View>
        {accessoryElement}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
});

export const MenuItem = styled<MenuItemProps>(MenuItemComponent);
