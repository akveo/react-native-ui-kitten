/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
  ListRenderItemInfo,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { ChildrenWithProps } from '../../devsupport';
import {
  Input,
  InputElement,
  InputProps,
  InputRef,
} from '../input/input.component';
import { List } from '../list/list.component';
import { Popover } from '../popover/popover.component';
import {
  AutocompleteItemElement,
  AutocompleteItemProps,
} from './autocompleteItem.component';

export interface AutocompleteProps extends InputProps {
  children?: ChildrenWithProps<AutocompleteItemProps>;
  onSelect?: (index: number) => void;
  placement?: string;
}

export type AutocompleteElement = React.ReactElement<AutocompleteProps>;

export interface AutocompleteRef {
  focus: () => void;
  blur: () => void;
  isFocused: () => boolean;
  clear: () => void;
}

/**
 * Autocomplete is a normal text input enhanced by a panel of suggested options.
 *
 * @extends React.FC
 *
 * @method {() => void} focus - Focuses an input field and sets data list visible.
 *
 * @method {() => void} blur - Removes focus from input field and sets data list invisible.
 *
 * @method {() => boolean} isFocused - Returns true if the input field is currently focused.
 *
 * @method {() => void} clear - Removes all text from the input field.
 *
 * @property {ReactElement<AutocompleteItemProps> | ReactElement<AutocompleteItemProps>[]} children -
 * Options displayed within list.
 *
 * @property {(number) => void} onSelect - Called when option is pressed.
 *
 * @note When the component is rendered inside a `ScrollView`, `FlatList` or `SectionList`, set
 * `keyboardShouldPersistTaps='handled'` on that list. With the default `'never'`, React Native
 * uses the first tap on an option to dismiss the keyboard instead of selecting the option, so
 * users have to tap twice. The options popup is a React descendant of the enclosing list even
 * though it renders in a native modal.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Useful for giving user a hint on the input validity.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `small`, `medium` or `large`.
 * Defaults to *medium*.
 *
 * @property {ReactText | (TextProps) => ReactElement} label - String, number or a function component
 * to render to top of the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {(ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {(ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {string | PopoverPlacement} placement - Position of the options list relative to the input field.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {() => void} onFocus - Called when options list becomes visible.
 *
 * @property {() => void} onBlur - Called when options list becomes invisible.
 *
 * @property {InputProps} ...InputProps - Any props applied to Input component.
 *
 * @overview-example AutocompleteSimpleUsage
 * Autocomplete may contain options to be rendered within suggestions list.
 * Options should be provided by passing them to children.
 *
 * @overview-example AutocompleteAccessories
 * Autocomplete may contain accessories by passing `accessoryLeft` or `accessoryRight` props.
 * By default, we expect it to be images.
 *
 * @example AutocompleteHandleKeyboard
 * On mobile devices, options may be overlapped by keyboard.
 * It can be handled with `placement` property.
 *
 * @example AutocompleteAsync
 * For requesting a real-world data by typing, http requests may be sent with debounce.
 */
const AutocompleteComponent = forwardRef<AutocompleteRef, AutocompleteProps>(({
  children,
  onSelect,
  placement = 'inner top',
  testID,
  onFocus: onFocusProp,
  onSubmitEditing: onSubmitEditingProp,
  ...inputProps
}, ref) => {
  const [listVisible, setListVisible] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const inputRefAnchor = useRef<InputRef>(null);
  const prevChildCountRef = useRef(React.Children.count(children));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = useMemo(() => {
    return React.Children.toArray(children || []);
  }, [children]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    isFocused: () => {
      return inputRef.current?.isFocused() || false;
    },
    clear: () => {
      inputRef.current?.clear();
    },
  }), []);

  useEffect(() => {
    const currentChildCount = data.length;
    const isChildCountChanged = currentChildCount !== prevChildCountRef.current;
    const shouldBecomeVisible = !listVisible && inputRef.current?.isFocused() && isChildCountChanged;

    if (shouldBecomeVisible) {
      setListVisible(true);
    }

    prevChildCountRef.current = currentChildCount;
  }, [data.length, listVisible]);

  const setOptionsListVisible = useCallback(() => {
    const hasData = data.length > 0;
    if (hasData) {
      setListVisible(true);
    }
  }, [data.length]);

  const setOptionsListInvisible = useCallback(() => {
    setListVisible(false);
  }, []);

  const onInputFocus = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setOptionsListVisible();
    onFocusProp?.(event);
  }, [setOptionsListVisible, onFocusProp]);

  const onAnchorInputFocus = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    inputRefAnchor.current?.blur();
    setOptionsListVisible();
    inputRef.current?.focus();
    onFocusProp?.(event);
  }, [setOptionsListVisible, onFocusProp]);

  const onInputSubmitEditing = useCallback((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void => {
    setOptionsListInvisible();
    onSubmitEditingProp?.(e);
  }, [setOptionsListInvisible, onSubmitEditingProp]);

  const onBackdropPress = useCallback((): void => {
    inputRef.current?.blur();
    inputRefAnchor.current?.blur();
    setOptionsListInvisible();
  }, [setOptionsListInvisible]);

  const onItemPress = useCallback((index: number): void => {
    if (onSelect) {
      setOptionsListInvisible();
      onSelect(index);
    }
  }, [onSelect, setOptionsListInvisible]);

  const renderItem = useCallback((info: ListRenderItemInfo<AutocompleteItemElement>): AutocompleteItemElement => {
    return React.cloneElement(info.item, { onPress: () => onItemPress(info.index) });
  }, [onItemPress]);

  const renderAnchorInputElement = useCallback((): InputElement => {
    return (
      <View>
        <Input
          {...inputProps}
          ref={inputRefAnchor}
          testID='@autocomplete/input-anchor'
          showSoftInputOnFocus={false}
          onFocus={onAnchorInputFocus}
          onSubmitEditing={onInputSubmitEditing}
        />
      </View>
    );
  }, [inputProps, onAnchorInputFocus, onInputSubmitEditing]);

  const renderInputElement = useCallback((): InputElement => {
    return (
      <View>
        <Input
          {...inputProps}
          ref={inputRef}
          testID='@autocomplete/input'
          showSoftInputOnFocus={true}
          autoFocus={true}
          onFocus={onInputFocus}
          onSubmitEditing={onInputSubmitEditing}
        />
      </View>
    );
  }, [inputProps, onInputFocus, onInputSubmitEditing]);

  return (
    <Popover
      style={styles.popover}
      placement={placement}
      testID={testID}
      visible={listVisible}
      fullWidth={true}
      anchor={renderAnchorInputElement}
      onBackdropPress={onBackdropPress}
    >
      <View>
        {renderInputElement()}
        <List
          style={styles.list}
          keyboardShouldPersistTaps='always'
          data={data}
          bounces={false}
          renderItem={renderItem}
        />
      </View>
    </Popover>
  );
});

AutocompleteComponent.displayName = 'Autocomplete';

export const Autocomplete = AutocompleteComponent;

const styles = StyleSheet.create({
  popover: {
    maxHeight: 192,
    overflow: 'hidden',
    borderWidth: 0,
  },
  list: {
    flexGrow: 0,
    overflow: 'hidden',
  },
});

