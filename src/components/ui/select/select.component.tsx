/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState, useImperativeHandle } from 'react';
import {
  Animated,
  GestureResponderEvent,
  ImageProps,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  Platform,
  Role,
  StyleSheet,
  TargetedEvent,
  TextProps,
  TextStyle,
  View,
} from 'react-native';
import {
  accessibleNameOf,
  buildAccessibilityProps,
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
import { List, ListProps, ListRef } from '../list/list.component';
import {
  Popover,
  PopoverProps,
} from '../popover/popover.component';
import { PopoverPlacement } from '../popover/type';
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
  value?: RenderProp<TextProps> | TextElement | string | number;
  multiSelect?: boolean;
  /**
   * Position of the options list relative to the control.
   * Defaults to `bottom`.
   */
  placement?: PopoverPlacement | string;
  /**
   * Props for the `Popover` that shows the options, e.g. `fullWidth` (defaults to `true`),
   * `blocking`, `anchorContainerStyle`, `backdropStyle` or `style`. `visible`, `anchor` and
   * `children` are managed by Select; `onBackdropPress` is called before the list closes.
   */
  popoverProps?: SelectPopoverProps;
  placeholder?: RenderProp<TextProps> | TextElement | string | number;
  label?: RenderProp<TextProps> | TextElement | string | number;
  caption?: RenderProp<TextProps> | TextElement | string | number;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  status?: EvaStatus;
  size?: EvaInputSize;
  appearance?: LiteralUnion<'default'>;
  /**
   * Ref of the `List` that renders the options, for `scrollToIndex` and the other list methods.
   * The list is mounted while the options are shown, so the ref is set once the Select opens.
   */
  listRef?: React.Ref<ListRef>;
  /**
   * Props for the `List` that renders the options, e.g. `getItemLayout`, `initialScrollIndex` or
   * `keyboardShouldPersistTaps`. List indices count the direct children of Select: a `SelectGroup`
   * is a single row that renders its items. `data` and `renderItem` are managed by Select.
   */
  listProps?: SelectListProps;
}

export type SelectListProps = Omit<ListProps, 'data' | 'renderItem'>;

export type SelectPopoverProps = Partial<Omit<PopoverProps, 'visible' | 'anchor' | 'children'>>;

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
const MAX_SCROLL_RETRIES = 5;

/**
 * A dropdown menu for selecting options.
 * Select accepts SelectItem or SelectGroup components as children.
 *
 * @extends React.FC
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
 * @property {string | PopoverPlacement} placement - Position of the options list relative to the control.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {PopoverProps} popoverProps - Props for the Popover that shows the options,
 * e.g. `fullWidth` (defaults to *true*, set `false` to size the list by its content), `blocking`,
 * `anchorContainerStyle`, `backdropStyle` or `style`.
 * `visible`, `anchor` and `children` are managed by Select; `onBackdropPress` is called before the list closes.
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
 * @property {React.Ref<ListRef>} listRef - Ref of the `List` that renders the options.
 * Use it to call `scrollToIndex` when the Select opens (`onFocus`). Set while the options are shown.
 *
 * @property {ListProps} listProps - Props forwarded to the `List` that renders the options,
 * e.g. `getItemLayout` (required by `scrollToIndex` for rows that are not rendered yet) or `initialScrollIndex`.
 * List indices count the direct children of Select: a `SelectGroup` is a single row that renders its items.
 * `data` and `renderItem` are managed by Select.
 *
 * @overview-example SelectSimpleUsage
 * @overview-example SelectMultiSelect
 */
const SelectComponent = React.forwardRef<SelectRef, SelectProps>(
  (props, ref) => {
    const {
      appearance,
      style,
      children,
      selectedIndex = [],
      onSelect,
      value,
      multiSelect = false,
      placement = 'bottom',
      popoverProps,
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
      listRef,
      listProps,
      onBlur: onBlurProp,
      onPressIn: onPressInProp,
      onPressOut: onPressOutProp,
      testID,
      ...touchableProps
    } = props;

    const [listVisible, setListVisible] = useState(false);
    const optionsListRef = useRef<ListRef | null>(null);
    const scrollToSelectedPendingRef = useRef(false);
    // Fallback retries used in this opening; the timer is dropped when the list closes or unmounts.
    const scrollRetryCountRef = useRef(0);
    const scrollRetryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

    // Row of the options list that holds the selected option, the topmost one for a multi select
    // (selection order is not list order): a grouped option lives inside the row of its group.
    const selectedListIndex = useMemo((): number => {
      const rows = selectedIndices
        .filter(Boolean)
        .map((index): number => index.section >= 0 ? index.section : index.row);
      return rows.length > 0 ? Math.min(...rows) : -1;
    }, [selectedIndices]);

    const clearScrollRetry = useCallback((): void => {
      if (scrollRetryTimerRef.current !== null) {
        clearTimeout(scrollRetryTimerRef.current);
        scrollRetryTimerRef.current = null;
      }
    }, []);

    useEffect(() => clearScrollRetry, [clearScrollRetry]);

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
        scrollToSelectedPendingRef.current = true;
        scrollRetryCountRef.current = 0;
        setListVisible(true);
        dispatch([Interaction.ACTIVE]);
        createExpandAnimation(-CHEVRON_DEG_COLLAPSED).start(() => {
          onFocusProp?.(null);
        });
      }
    }, [data.length, dispatch, createExpandAnimation, onFocusProp]);

    const setOptionsListInvisible = useCallback(() => {
      clearScrollRetry();
      setListVisible(false);
      dispatch([]);
      createExpandAnimation(CHEVRON_DEG_EXPANDED).start(() => {
        onBlurProp?.(null);
      });
    }, [dispatch, createExpandAnimation, onBlurProp, clearScrollRetry]);

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

    const onBackdropPressProp = popoverProps?.onBackdropPress;
    const onBackdropPress = useCallback(() => {
      onBackdropPressProp?.();
      setOptionsListInvisible();
    }, [onBackdropPressProp, setOptionsListInvisible]);

    const setListRefs = useCallback((instance: ListRef | null): void => {
      optionsListRef.current = instance;
      if (typeof listRef === 'function') {
        listRef(instance);
      } else if (listRef) {
        (listRef as React.MutableRefObject<ListRef | null>).current = instance;
      }
    }, [listRef]);

    // The list mounts scrolled to the top every time it opens; bring the selected option into
    // view once its content is laid out. A consumer `initialScrollIndex` takes over.
    const onListContentSizeChange = useCallback((width: number, height: number): void => {
      listProps?.onContentSizeChange?.(width, height);
      if (!scrollToSelectedPendingRef.current) {
        return;
      }
      scrollToSelectedPendingRef.current = false;
      const index = selectedListIndex;
      if (listProps?.initialScrollIndex !== undefined || index <= 0 || index >= data.length) {
        return;
      }
      optionsListRef.current?.scrollToIndex({ index, animated: false, viewPosition: 0 });
    }, [listProps, selectedListIndex, data.length]);

    // Rows past the render window have no frame yet: jump near them by the average row
    // height, then retry once the window has caught up. Each jump renders more rows and refines the
    // average, so a long list needs a few rounds (two to three for the last of 30 options on iOS and
    // Android: the first failure comes before any row is measured); after
    // MAX_SCROLL_RETRIES the list stays at the approximate offset instead of looping.
    const onListScrollToIndexFailed = useCallback((info: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }): void => {
      optionsListRef.current?.scrollToOffset({ offset: info.averageItemLength * info.index, animated: false });
      if (scrollRetryCountRef.current >= MAX_SCROLL_RETRIES) {
        return;
      }
      scrollRetryCountRef.current += 1;
      clearScrollRetry();
      scrollRetryTimerRef.current = setTimeout(() => {
        scrollRetryTimerRef.current = null;
        optionsListRef.current?.scrollToIndex({ index: info.index, animated: false, viewPosition: 0 });
      }, 50);
    }, [clearScrollRetry]);

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

      return cloneItemWithProps(info.item, { descriptor, selected, disabled: itemDisabled, size, onPress: onItemPress });
    }, [service, multiSelect, selectedIndices, cloneItemWithProps, onItemPress, size]);

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
          {...touchableProps}
          {...buildAccessibilityProps({
            role: 'combobox',
            expanded: listVisible,
            disabled: Boolean(disabled),
            // `label` renders as a sibling of the trigger, so it is not picked
            // up by React Native's child-Text name derivation.
            label: accessibleNameOf(label),
          }, props)}
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
      accessoryLeft, accessoryRight, placeholder, renderDefaultIconElement,
      touchableProps, props, listVisible, label
    ]);

    return (
      <View style={style}>
        <FalsyText
          style={[staticStyles.label, componentStyle.label]}
          component={label}
        />
        <Popover
          fullWidth={true}
          animationType='fade'
          placement={placement}
          {...popoverProps}
          style={[staticStyles.popover, componentStyle.popover, popoverProps?.style]}
          visible={listVisible}
          anchor={renderInputElement}
          onBackdropPress={onBackdropPress}
        >
          <List
            // ARIA expects combobox -> listbox -> option. `listbox` has no
            // member in react-native's `AccessibilityRole`, so it degrades to
            // `list` on native while the web keeps the exact ARIA role.
            {...buildAccessibilityProps({ role: 'listbox' as Role })}
            bounces={false}
            onScrollToIndexFailed={onListScrollToIndexFailed}
            {...listProps}
            ref={setListRefs}
            style={[staticStyles.list, listProps?.style]}
            data={data}
            renderItem={renderItem}
            onContentSizeChange={onListContentSizeChange}
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

SelectComponent.displayName = 'Select';

export const Select = React.memo(SelectComponent);
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
