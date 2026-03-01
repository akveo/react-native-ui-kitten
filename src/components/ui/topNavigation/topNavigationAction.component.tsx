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
  TargetedEvent,
} from 'react-native';
import {
  FalsyFC,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  useStyled,
  StyleType,
} from '../../theme';

export interface TopNavigationActionProps extends TouchableWebProps {
  icon?: RenderProp<Partial<ImageProps>>;
  appearance?: LiteralUnion<'default' | 'control'>;
}

export type TopNavigationActionElement = React.ReactElement<TopNavigationActionProps>;

/**
 * A single action within the TopNavigation.
 * Actions should be rendered within TopNavigation by providing them through `accessory` props
 * to provide a usable component.
 *
 * @extends React.FC
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

const getComponentStyle = (source: StyleType): StyleType => {
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

export const TopNavigationAction: React.FC<TopNavigationActionProps> = ({
  style,
  icon,
  appearance,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  ...touchableProps
}): TouchableWebElement => {
  const { style: evaStyleRaw, dispatch } = useStyled('TopNavigationAction', { appearance });
  const evaStyle = useMemo(() => getComponentStyle(evaStyleRaw), [evaStyleRaw]);

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
      {...touchableProps}
      style={[evaStyle.container, style]}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <FalsyFC
        style={evaStyle.icon}
        component={icon}
      />
    </TouchableWeb>
  );
};

TopNavigationAction.displayName = 'TopNavigationAction';
