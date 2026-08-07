/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
import {
  ImageProps,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
} from 'react-native';
import {
  FalsyFC,
  FalsyText,
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
import { TextProps } from '../text/text.component';

export interface BottomNavigationTabProps extends TouchableWebProps {
  title?: RenderProp<TextProps> | string | number;
  icon?: RenderProp<Partial<ImageProps>>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  appearance?: LiteralUnion<'default' | string>;
}

export type BottomNavigationTabElement = React.ReactElement<BottomNavigationTabProps>;

/**
 * A single tab within the BottomNavigation.
 * Bottom tabs should be rendered within BottomNavigation to provide a usable navigation component.
 *
 * @extends React.FC
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the tab.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} icon - Function component
 * to render within the tab.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example BottomNavigationTabSimpleUsage
 */

const getComponentStyle = (source: StyleType): StyleType => {
  const {
    iconWidth,
    iconHeight,
    iconMarginVertical,
    iconTintColor,
    textMarginVertical,
    textFontFamily,
    textFontSize,
    textFontWeight,
    textColor,
    ...containerParameters
  } = source;

  return {
    container: containerParameters,
    text: {
      marginVertical: textMarginVertical,
      fontFamily: textFontFamily,
      fontSize: textFontSize,
      fontWeight: textFontWeight,
      color: textColor,
    },
    icon: {
      width: iconWidth,
      height: iconHeight,
      marginVertical: iconMarginVertical,
      tintColor: iconTintColor,
    },
  };
};

export const BottomNavigationTab: React.FC<BottomNavigationTabProps> = ({
  style,
  title,
  icon,
  selected,
  onSelect,
  appearance,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  ...touchableProps
}): TouchableWebElement => {
  const { style: evaStyleRaw, dispatch } = useStyled('BottomNavigationTab', { appearance, selected });
  const evaStyle = useMemo(() => getComponentStyle(evaStyleRaw), [evaStyleRaw]);

  const onMouseEnter = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
    dispatch([Interaction.HOVER]);
    onMouseEnterProp?.(event);
  }, [dispatch, onMouseEnterProp]);

  const onMouseLeave = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
    dispatch([]);
    onMouseLeaveProp?.(event);
  }, [dispatch, onMouseLeaveProp]);

  const onPress = useCallback(() => {
    onSelect?.(!selected);
  }, [onSelect, selected]);

  return (
    <TouchableWeb
      {...touchableProps}
      style={[evaStyle.container, styles.container, style]}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPress={onPress}
    >
      <FalsyFC
        style={evaStyle.icon}
        component={icon}
      />
      <FalsyText
        style={evaStyle.text}
        component={title}
      />
    </TouchableWeb>
  );
};

BottomNavigationTab.displayName = 'BottomNavigationTab';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
