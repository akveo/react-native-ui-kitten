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
import {
  CheckBox,
  CheckBoxElement,
} from '../checkbox/checkbox.component';
import { TextProps } from '../text/text.component';
import { SelectItemDescriptor } from './select.service';

type TouchableSelectProps = Overwrite<TouchableWebProps, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPress?: (descriptor: SelectItemDescriptor, event?: GestureResponderEvent) => void;
}>;

export interface SelectItemProps extends TouchableSelectProps {
  /**
   * String, number or a function component to render within the item.
   * If it is a function, expected to return a Text.
   */
  title?: RenderProp<TextProps> | React.ReactText;
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
   * Internal descriptor for select navigation.
   */
  descriptor?: SelectItemDescriptor;
  /**
   * Appearance of the component.
   * Can be `default` or `grouped`.
   * Defaults to *default*.
   */
  appearance?: LiteralUnion<'default' | 'grouped'>;
}

export type SelectItemElement = React.ReactElement<SelectItemProps>;

/**
 * A single item in Select.
 * Items should be rendered within Select or SelectGroup children to provide a usable component.
 *
 * @extends React.FC
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} title - String, number or a function component
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
 * @overview-example SelectItemSimpleUsage
 */
export const SelectItem = React.forwardRef<TouchableWeb, SelectItemProps>(
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

    const isMultiSelect = descriptor?.multiSelect ?? false;

    const { style: evaStyle, dispatch } = useStyled('SelectOption', {
      appearance,
      selected,
      disabled,
    });

    // Split eva style into component parts
    const componentStyle = useMemo(() => {
      const { paddingHorizontal, paddingLeft, paddingVertical, backgroundColor } = evaStyle as StyleType;

      const textStyles = PropsService.allWithPrefix(evaStyle as StyleType, 'text');
      const iconStyles = PropsService.allWithPrefix(evaStyle as StyleType, 'icon');

      return {
        container: {
          paddingHorizontal,
          paddingLeft,
          paddingVertical,
          backgroundColor,
        },
        text: {
          marginHorizontal: textStyles.textMarginHorizontal,
          fontFamily: textStyles.textFontFamily,
          fontSize: textStyles.textFontSize,
          fontWeight: textStyles.textFontWeight,
          color: textStyles.textColor,
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

    const onAccessoryCheckedChange = useCallback(() => {
      onPressProp?.(descriptor);
    }, [onPressProp, descriptor]);

    const renderAccessory = (iconStyle: StyleType): CheckBoxElement | null => {
      if (!isMultiSelect) {
        return null;
      }

      return (
        <CheckBox
          style={iconStyle}
          checked={selected}
          disabled={disabled}
          onChange={onAccessoryCheckedChange}
        />
      );
    };

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
        <FalsyFC
          style={componentStyle.icon}
          component={accessoryLeft}
          fallback={renderAccessory(componentStyle.icon)}
        />
        <FalsyText
          style={[staticStyles.text, componentStyle.text]}
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

SelectItem.displayName = 'SelectItem';

const staticStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    textAlign: 'left',
  },
});
