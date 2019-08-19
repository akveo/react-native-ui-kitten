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
  TouchableOpacityProps,
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
import { Override } from '../support/typings/type';

type IconElement = React.ReactElement<ImageProps>;

export interface MenuItemType {
  title: string;
  icon?: (style: StyleType) => IconElement;
  disabled?: boolean;
  subItems?: MenuItemType[];
}

interface ComponentProps extends MenuItemType {
  selected?: boolean;
}

export type MenuItemProps = StyledComponentProps & ComponentProps & TouchableTypeReturningProps<MenuItemType>;
export type MenuItemElement = React.ReactElement<MenuItemProps>;

class MenuItemComponent extends React.Component<MenuItemProps> {

  static styledComponentName: string = 'MenuItem';

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(this.props, event);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(this.props, event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(this.props, event);
    }
  };

  private onLongPress = (event: GestureResponderEvent) => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.props, event);
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

    return icon && icon(style);
  };

  private renderTitle = (style: StyleType): TextElement => {
    const { title } = this.props;

    return title && (
      <Text style={style}>{title}</Text>
    );
  };

  private renderComponentChildren = (style: StyleType): [IconElement, TextElement] => {
    return [
      this.renderIcon(style.icon),
      this.renderTitle(style.title),
    ];
  };

  public render(): React.ReactNode {
    const { themedStyle, style, ...restProps } = this.props;
    const { container, indicator, ...restStyles } = this.getComponentStyles(themedStyle);
    const [iconElement, textElement] = this.renderComponentChildren(restStyles);

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
        {iconElement}
        {textElement}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
});

export const MenuItem = styled<MenuItemProps>(MenuItemComponent);




export type TouchableTypeReturningProps<T> = Override<TouchableOpacityProps, {
  onPress?: (item: T, event: GestureResponderEvent) => void;
  onPressIn?: (item: T, event: GestureResponderEvent) => void;
  onPressOut?: (item: T, event: GestureResponderEvent) => void;
  onLongPress?: (item: T, event: GestureResponderEvent) => void;
}>;

export function allWithPrefix(source: StyleType, key: string): StyleType {
  return Object.keys(source)
    .filter((styleName: string) => styleName.includes(key))
    .reduce((obj: StyleType, styleKey: string) => {
      return {
        ...obj,
        [styleKey]: source[styleKey],
      };
    }, {});
}
