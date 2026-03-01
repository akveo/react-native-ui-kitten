/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { ReactNode, useCallback, useMemo, useRef, useState, useImperativeHandle } from 'react';
import {
  Animated,
  GestureResponderEvent,
  ImageProps,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TargetedEvent,
  TextProps,
  TextStyle,
  View,
} from 'react-native';
import {
  ChildrenWithProps,
  EvaInputSize,
  EvaStatus,
  FalsyFC,
  FalsyText,
  IndexPath,
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
import { List } from '../list/list.component';
import { Popover } from '../popover/popover.component';
import { ChevronDown } from '../shared/chevronDown.component';
import { SelectGroupProps } from './selectGroup.component';
import {
  SelectItemElement,
  SelectItemProps,
} from './selectItem.component';
import {
  SelectItemDescriptor,
  SelectService,
} from './select.service';
import {TextElement} from "@ui-kitten/components";

export interface SelectProps extends TouchableWebProps {
  children?: ChildrenWithProps<SelectItemProps | SelectGroupProps>;
  selectedIndex?: IndexPath | IndexPath[];
  onSelect?: (index: IndexPath | IndexPath[]) => void;
  value?: RenderProp<TextProps> | TextElement;
  multiSelect?: boolean;
  placeholder?: RenderProp<TextProps> | TextElement;
  label?: RenderProp<TextProps> | TextElement;
  caption?: RenderProp<TextProps> | TextElement;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  status?: EvaStatus;
  size?: EvaInputSize;
  appearance?: LiteralUnion<'default'>;
}

export type SelectElement = React.ReactElement<SelectProps>;

export interface SelectRef {
  focus: () => void;
  blur: () => void;
  isFocused: () => boolean;
  clear: () => void;
}

const CHEVRON_DEG_COLLAPSED = -180;
const CHEVRON_DEG_EXPANDED = 0;
const CHEVRON_ANIM_DURATION = 200;

/**
 * A dropdown menu for selecting options.
 * Select accepts SelectItem or SelectGroup components as children.
 *
 * @extends React.Component
 *
 * @property {ReactElement<SelectItemProps> | ReactElement<SelectItemProps>[]} children -
 * Items to be rendered within the Select.
 *
 * @property {IndexPath | IndexPath[]} selectedIndex - Index or array of indices of selected options.
 *
 * @property {(IndexPath | IndexPath[]) => void} onSelect - Called when option is selected.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} value - String, number or a function component
 * to render for the selected option(s).
 *
 * @property {boolean} multiSelect - Whether multiple selection is allowed. Defaults to false.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} placeholder - Placeholder when no option selected.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} label - Label text.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} caption - Caption text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Left accessory.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Right accessory (defaults to chevron).
 *
 * @property {string} status - Status of the component (primary, success, info, warning, danger, basic).
 *
 * @property {string} size - Size of the component (small, medium, large).
 *
 * @property {boolean} disabled - Whether the component is disabled.
 *
 * @overview-example SelectSimpleUsage
 * @overview-example SelectMultiSelect
 */
export const Select = React.forwardRef<SelectRef, SelectProps>(
  (props, ref) => {
    const {
      appearance,
      style,
      children,
      selectedIndex = [],
      onSelect,
      value,
      multiSelect = false,
      placeholder = 'Select Option',
      label,
      caption,
      accessoryLeft,
      accessoryRight,
      status,
      size,
      disabled,
      onMouseEnter: onMouseEnterProp,
      onMouseLeave: onMouseLeaveProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      onPressIn: onPressInProp,
      onPressOut: onPressOutProp,
      testID,
      ...touchableProps // eslint-disable-line @typescript-eslint/no-unused-vars
    } = props;

    const [listVisible, setListVisible] = useState(false);
    const serviceRef = useRef(new SelectService());
    const expandAnimationRef = useRef(new Animated.Value(0));

    const { style: evaStyle, dispatch } = useStyled('Select', {
      appearance,
      status,
      size,
      disabled,
    });

    const service = serviceRef.current;
    const expandAnimation = expandAnimationRef.current;

    const data = useMemo(() => {
      return React.Children.toArray(children || []) as Array<Exclude<ReactNode, boolean | null | undefined>>;
    }, [children]);

    const selectedIndices = useMemo(() => {
      if (!selectedIndex) {
        return [];
      }
      return Array.isArray(selectedIndex) ? selectedIndex : [selectedIndex];
    }, [selectedIndex]);

    const expandToRotateInterpolation = useMemo(() => {
      return expandAnimation.interpolate({
        inputRange: [CHEVRON_DEG_COLLAPSED, CHEVRON_DEG_EXPANDED],
        outputRange: [`${CHEVRON_DEG_COLLAPSED}deg`, `${CHEVRON_DEG_EXPANDED}deg`],
      });
    }, [expandAnimation]);

    // Split eva style into component parts
    const componentStyle = useMemo(() => {
      const {
        textMarginHorizontal,
        textFontFamily,
        textFontSize,
        textFontWeight,
        textColor,
        placeholderColor,
        placeholderFontSize,
        placeholderFontWeight,
        placeholderFontFamily,
        iconWidth,
        iconHeight,
        iconMarginHorizontal,
        iconTintColor,
        labelColor,
        labelFontSize,
        labelMarginBottom,
        labelFontWeight,
        labelFontFamily,
        captionColor,
        captionFontSize,
        captionFontWeight,
        captionFontFamily,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        captionIconWidth,
        captionIconHeight,
        captionIconMarginRight,
        captionIconTintColor,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        popoverMaxHeight,
        popoverBorderRadius,
        popoverBorderColor,
        popoverBorderWidth,
        ...inputParameters
      } = evaStyle as StyleType;

      return {
        input: inputParameters,
        text: {
          marginHorizontal: textMarginHorizontal,
          fontFamily: textFontFamily,
          fontSize: textFontSize,
          fontWeight: textFontWeight,
          color: textColor,
        },
        placeholder: {
          marginHorizontal: textMarginHorizontal,
          fontSize: placeholderFontSize,
          fontWeight: placeholderFontWeight,
          fontFamily: placeholderFontFamily,
          color: placeholderColor,
        },
        icon: {
          width: iconWidth,
          height: iconHeight,
          marginHorizontal: iconMarginHorizontal,
          tintColor: iconTintColor,
        },
        label: {
          marginBottom: labelMarginBottom,
          fontSize: labelFontSize,
          fontWeight: labelFontWeight,
          fontFamily: labelFontFamily,
          color: labelColor,
        },
        caption: {
          fontSize: captionFontSize,
          fontWeight: captionFontWeight,
          fontFamily: captionFontFamily,
          color: captionColor,
        },
        popover: {
          maxHeight: popoverMaxHeight,
          borderRadius: popoverBorderRadius,
          borderWidth: popoverBorderWidth,
          borderColor: popoverBorderColor,
        },
      };
    }, [evaStyle]);

    const createExpandAnimation = useCallback((toValue: number) => {
      return Animated.timing(expandAnimation, {
        toValue,
        duration: CHEVRON_ANIM_DURATION,
        useNativeDriver: Platform.OS !== 'web',
      });
    }, [expandAnimation]);

    const setOptionsListVisible = useCallback(() => {
      const hasData = data.length > 0;
      if (hasData) {
        setListVisible(true);
        dispatch([Interaction.ACTIVE]);
        createExpandAnimation(-CHEVRON_DEG_COLLAPSED).start(() => {
          onFocusProp?.(null);
        });
      }
    }, [data.length, dispatch, createExpandAnimation, onFocusProp]);

    const setOptionsListInvisible = useCallback(() => {
      setListVisible(false);
      dispatch([]);
      createExpandAnimation(CHEVRON_DEG_EXPANDED).start(() => {
        onBlurProp?.(null);
      });
    }, [dispatch, createExpandAnimation, onBlurProp]);

    // Imperative handle for ref
    useImperativeHandle(ref, () => ({
      focus: () => setOptionsListVisible(),
      blur: () => setOptionsListInvisible(),
      isFocused: () => listVisible,
      clear: () => onSelect?.(null),
    }), [setOptionsListVisible, setOptionsListInvisible, listVisible, onSelect]);

    // Event handlers
    const onMouseEnter = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([Interaction.HOVER]);
      onMouseEnterProp?.(event);
    }, [dispatch, onMouseEnterProp]);

    const onMouseLeave = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([]);
      onMouseLeaveProp?.(event);
    }, [dispatch, onMouseLeaveProp]);

    const onPress = useCallback(() => {
      setOptionsListVisible();
    }, [setOptionsListVisible]);

    const onPressIn = useCallback((event: GestureResponderEvent) => {
      dispatch([Interaction.ACTIVE]);
      onPressInProp?.(event);
    }, [dispatch, onPressInProp]);

    const onPressOut = useCallback((event: GestureResponderEvent) => {
      dispatch([]);
      onPressOutProp?.(event);
    }, [dispatch, onPressOutProp]);

    const onItemPress = useCallback((descriptor: SelectItemDescriptor) => {
      if (onSelect) {
        const newSelectedIndices = service.selectItem(multiSelect, descriptor, selectedIndices);
        if (!multiSelect) {
          setOptionsListInvisible();
        }
        onSelect(newSelectedIndices);
      }
    }, [onSelect, service, multiSelect, selectedIndices, setOptionsListInvisible]);

    const onBackdropPress = useCallback(() => {
      setOptionsListInvisible();
    }, [setOptionsListInvisible]);

    const cloneItemWithProps = useCallback((el: SelectItemElement, itemProps: SelectItemProps): SelectItemElement => {
      const nestedElements = React.Children.map(el.props.children, (nestedEl: SelectItemElement, index: number) => {
        const descriptor = service.createDescriptorForNestedElement(nestedEl, itemProps.descriptor, index);
        const selected: boolean = service.isSelected(descriptor, selectedIndices);

        return cloneItemWithProps(nestedEl, { ...itemProps, descriptor, selected, disabled: false });
      });

      return React.cloneElement(el, { ...itemProps, ...el.props }, nestedElements);
    }, [service, selectedIndices]);

    const renderItem = useCallback((info: ListRenderItemInfo<SelectItemElement>): SelectItemElement => {
      const descriptor = service.createDescriptorForElement(info.item, multiSelect, info.index);
      const selected: boolean = service.isSelected(descriptor, selectedIndices);
      const itemDisabled: boolean = service.isDisabled(descriptor);

      return cloneItemWithProps(info.item, { descriptor, selected, disabled: itemDisabled, onPress: onItemPress });
    }, [service, multiSelect, selectedIndices, cloneItemWithProps, onItemPress]);

    const renderDefaultIconElement = useCallback((iconStyle: StyleType): React.ReactElement => {
      const { tintColor, ...svgStyle } = iconStyle;
      return (
        <Animated.View style={{ transform: [{ rotate: expandToRotateInterpolation }] }}>
          <ChevronDown
            style={svgStyle}
            fill={tintColor}
          />
        </Animated.View>
      );
    }, [expandToRotateInterpolation]);

    const renderInputElement = useCallback((): TouchableWebElement => {
      const displayValue = value || service.toStringSelected(selectedIndices);
      const textStyle: TextStyle = displayValue && componentStyle.text;

      return (
        <TouchableWeb
          testID={testID}
          style={[staticStyles.input, componentStyle.input]}
          onPress={onPress}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          disabled={disabled}
        >
          <FalsyFC
            style={componentStyle.icon}
            component={accessoryLeft}
          />
          <FalsyText
            style={[staticStyles.text, componentStyle.placeholder, textStyle]}
            numberOfLines={1}
            ellipsizeMode='tail'
            component={displayValue || placeholder}
          />
          <FalsyFC
            style={componentStyle.icon}
            component={accessoryRight}
            fallback={renderDefaultIconElement(componentStyle.icon)}
          />
        </TouchableWeb>
      );
    }, [
      value, service, selectedIndices, componentStyle, testID, onPress,
      onMouseEnter, onMouseLeave, onPressIn, onPressOut, disabled,
      accessoryLeft, accessoryRight, placeholder, renderDefaultIconElement
    ]);

    return (
      <View style={style}>
        <FalsyText
          style={[staticStyles.label, componentStyle.label]}
          component={label}
        />
        <Popover
          style={[staticStyles.popover, componentStyle.popover]}
          visible={listVisible}
          fullWidth={true}
          anchor={renderInputElement}
          onBackdropPress={onBackdropPress}
          animationType="fade"
        >
          <List
            style={staticStyles.list}
            data={data}
            bounces={false}
            renderItem={renderItem}
          />
        </Popover>
        <FalsyText
          style={[staticStyles.caption, componentStyle.caption]}
          component={caption}
        />
      </View>
    );
  },
);

Select.displayName = 'Select';

const staticStyles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popover: {
    overflow: 'hidden',
  },
  list: {
    flexGrow: 0,
  },
  text: {
    flex: 1,
    textAlign: 'left',
  },
  label: {
    textAlign: 'left',
  },
  caption: {
    textAlign: 'left',
  },
});
