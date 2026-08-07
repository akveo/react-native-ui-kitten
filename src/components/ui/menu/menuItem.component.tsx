/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
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
  useStyled,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';
import { MenuItemDescriptor } from './menu.service';

type TouchableMenuItemProps = Overwrite<TouchableWebProps, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPress?: (descriptor: MenuItemDescriptor, event?: GestureResponderEvent) => void;
}>;

export interface MenuItemProps extends TouchableMenuItemProps {
  /**
   * String, number or a function component to render within the item.
   * If it is a function, expected to return a Text.
   */
  title?: RenderProp<TextProps> | string | number;
  /**
   * Function component to render to start of the title.
   * Expected to return an Image.
   */
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  /**
   * Function component to render to end of the title.
   * Expected to return an Image.
   */
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  /**
   * Whether the item is selected.
   */
  selected?: boolean;
  /**
   * Internal descriptor for menu navigation.
   */
  descriptor?: MenuItemDescriptor;
  /**
   * Appearance of the component.
   * Can be `default` or `grouped`.
   * Defaults to *default*.
   */
  appearance?: LiteralUnion<'default' | 'grouped'>;
}

export type MenuItemElement = React.ReactElement<MenuItemProps>;

/**
 * A single item in Menu.
 * Items should be rendered within Menu or MenuGroup to provide a usable navigation component.
 *
 * @extends React.FC
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
export const MenuItem = React.forwardRef<TouchableWeb, MenuItemProps>(
  (props, ref) => {
    const {
      appearance,
      style,
      title,
      accessoryLeft,
      accessoryRight,
      selected,
      descriptor,
      disabled,
      onMouseEnter: onMouseEnterProp,
      onMouseLeave: onMouseLeaveProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      onPress: onPressProp,
      onPressIn: onPressInProp,
      onPressOut: onPressOutProp,
      ...touchableProps
    } = props;

    const { style: evaStyle, dispatch } = useStyled('MenuItem', {
      appearance,
      selected,
      disabled,
    });

    // Split eva style into component parts
    const componentStyle = useMemo(() => {
      const { paddingHorizontal, paddingVertical, paddingLeft, backgroundColor } = evaStyle as StyleType;

      const titleStyles: StyleType = PropsService.allWithPrefix(evaStyle as StyleType, 'title');
      const indicatorStyles: StyleType = PropsService.allWithPrefix(evaStyle as StyleType, 'indicator');
      const iconStyles: StyleType = PropsService.allWithPrefix(evaStyle as StyleType, 'icon');

      return {
        container: {
          paddingHorizontal,
          paddingLeft,
          paddingVertical,
          backgroundColor,
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
    }, [evaStyle]);

    // Event handlers with dispatch
    const onMouseEnter = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([Interaction.HOVER]);
      onMouseEnterProp?.(event);
    }, [dispatch, onMouseEnterProp]);

    const onMouseLeave = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([]);
      onMouseLeaveProp?.(event);
    }, [dispatch, onMouseLeaveProp]);

    const onFocus = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([Interaction.FOCUSED]);
      onFocusProp?.(event);
    }, [dispatch, onFocusProp]);

    const onBlur = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([]);
      onBlurProp?.(event);
    }, [dispatch, onBlurProp]);

    const onPress = useCallback((event: GestureResponderEvent) => {
      onPressProp?.(descriptor, event);
    }, [onPressProp, descriptor]);

    const onPressIn = useCallback((event: GestureResponderEvent) => {
      dispatch([Interaction.ACTIVE]);
      onPressInProp?.(event);
    }, [dispatch, onPressInProp]);

    const onPressOut = useCallback((event: GestureResponderEvent) => {
      dispatch([]);
      onPressOutProp?.(event);
    }, [dispatch, onPressOutProp]);

    return (
      <TouchableWeb
        ref={ref}
        {...touchableProps}
        disabled={disabled}
        style={[staticStyles.container, componentStyle.container, style]}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View style={[StyleSheet.absoluteFill, componentStyle.indicator]} />
        <FalsyFC
          style={componentStyle.icon}
          component={accessoryLeft}
        />
        <FalsyText
          style={[componentStyle.title, staticStyles.title]}
          component={title}
        />
        <FalsyFC
          style={componentStyle.icon}
          component={accessoryRight}
        />
      </TouchableWeb>
    );
  },
);

MenuItem.displayName = 'MenuItem';

const staticStyles = StyleSheet.create({
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
