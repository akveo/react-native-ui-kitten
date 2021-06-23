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
  View,
} from 'react-native';
import {
  FalsyFC,
  FalsyText,
  PropsService,
  RenderProp,
  TouchableWeb,
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
import { TextProps } from '../text/text.component';
import { MenuItemDescriptor } from './menu.service';

type MenuItemStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default' | 'grouped'>;
}>;

type TouchableMenuItemProps = Overwrite<TouchableWebProps, {
  onPress?: (descriptor: MenuItemDescriptor, event?: GestureResponderEvent) => void;
}>;

export interface MenuItemProps extends TouchableMenuItemProps, MenuItemStyledProps {
  title?: RenderProp<TextProps> | React.ReactText;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  selected?: boolean;
  descriptor?: MenuItemDescriptor;
}

export type MenuItemElement = React.ReactElement<MenuItemProps>;

/**
 * A single item in Menu.
 * Items should be rendered within Menu or MenuGroup to provide a usable navigation component.
 *
 * @extends React.Component
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the item.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the *title*.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the *title*.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example MenuItemSimpleUsage
 */
@styled('MenuItem')
export class MenuItem extends React.Component<MenuItemProps> {

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

  private onBlur = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onBlur && this.props.onBlur(event);
  };

  private onPress = (event: GestureResponderEvent): void => {
    this.props.onPress && this.props.onPress(this.props.descriptor, event);
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
    this.props.onPressIn && this.props.onPressIn(event);
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);
    this.props.onPressOut && this.props.onPressOut(event);
  };

  private getComponentStyle = (style: StyleType) => {
    const { paddingHorizontal, paddingVertical, paddingLeft, backgroundColor } = style;

    const titleStyles: StyleType = PropsService.allWithPrefix(style, 'title');
    const indicatorStyles: StyleType = PropsService.allWithPrefix(style, 'indicator');
    const iconStyles: StyleType = PropsService.allWithPrefix(style, 'icon');

    return {
      container: {
        paddingHorizontal: paddingHorizontal,
        paddingLeft: paddingLeft,
        paddingVertical: paddingVertical,
        backgroundColor: backgroundColor,
      },
      title: {
        marginHorizontal: titleStyles.titleMarginHorizontal,
        fontFamily: titleStyles.titleFontFamily,
        fontSize: titleStyles.titleFontSize,
        fontWeight: titleStyles.titleFontWeight,
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

  public render(): React.ReactNode {
    const { eva, style, title, accessoryLeft, accessoryRight, children, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWeb
        {...touchableProps}
        style={[styles.container, evaStyle.container, style]}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={[StyleSheet.absoluteFill, evaStyle.indicator]} />
        <FalsyFC
          style={evaStyle.icon}
          component={accessoryLeft}
        />
        <FalsyText
          style={[evaStyle.title, styles.title]}
          component={title}
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    textAlign: 'left',
  },
});
