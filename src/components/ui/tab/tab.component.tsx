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

export interface TabProps extends TouchableWebProps {
  children?: React.ReactElement;
  title?: RenderProp<TextProps> | React.ReactText;
  icon?: RenderProp<Partial<ImageProps>>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  appearance?: LiteralUnion<'default'>;
}

export type TabElement = React.ReactElement<TabProps>;

/**
 * A single tab within the TabView or TabBar.
 * Tabs should be rendered within TabView or TabBar to provide a usable component.
 *
 * @extends React.FC
 *
 * @property {ReactElement} children - A component displayed below the tab.
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the tab.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} icon - Function component
 * to render within the tab.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example TabSimpleUsage
 */

const getComponentStyle = (source: StyleType): StyleType => {
  const {
    textMarginVertical,
    textFontFamily,
    textFontSize,
    textFontWeight,
    textColor,
    iconWidth,
    iconHeight,
    iconMarginVertical,
    iconTintColor,
    ...containerParameters
  } = source;

  return {
    container: containerParameters,
    icon: {
      width: iconWidth,
      height: iconHeight,
      marginVertical: iconMarginVertical,
      tintColor: iconTintColor,
    },
    title: {
      marginVertical: textMarginVertical,
      fontFamily: textFontFamily,
      fontSize: textFontSize,
      fontWeight: textFontWeight,
      color: textColor,
    },
  };
};

export const Tab: React.FC<TabProps> = ({
  style,
  title,
  icon,
  selected = false,
  onSelect,
  appearance,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  ...touchableProps
}): TouchableWebElement => {
  const { style: evaStyleRaw, dispatch } = useStyled('Tab', { appearance, selected });
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
        style={evaStyle.title}
        component={title}
      />
    </TouchableWeb>
  );
};

Tab.displayName = 'Tab';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
