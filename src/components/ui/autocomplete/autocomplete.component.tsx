/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, memo } from 'react';
import {
  Keyboard,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  Platform,
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

// On web a mouse-down on an option moves the focus away from the input before the press arrives;
// the blur closes the list, so the press lands on nothing. Cancelling the mouse-down keeps the
// input focused (its keyboard and caret stay) and lets the press select the option. Native taps
// already keep the focus through `keyboardShouldPersistTaps`.
const keepInputFocused = (event: { preventDefault: () => void }): void => event.preventDefault();
const listWebProps = (): { onMouseDown?: typeof keepInputFocused } => (
  Platform.OS === 'web' ? { onMouseDown: keepInputFocused } : {}
);

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
 * @property {string} testID - Test id of the options list. The input field derives its own ids from it:
 * the field is `@@<testID>/input/input` and its container `@@<testID>/input/container`, so several
 * autocompletes on one screen stay distinguishable. Without a `testID` the field keeps the
 * `@@autocomplete/input/input` id.
 *
 * @note The options list floats above the app through the `ApplicationProvider` panel without a
 * backdrop: the first tap on an option selects it, and the first tap on a control next to the
 * field reaches that control. The list closes when the input blurs, when an option is selected,
 * on submit and when the keyboard is dismissed. With the React Native default
 * `keyboardShouldPersistTaps='never'` on an enclosing `ScrollView`, a tap outside the focused
 * input first dismisses the keyboard, which blurs the input and closes the list; set
 * `keyboardShouldPersistTaps='handled'` on that list to let such a tap reach its target at once.
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
 * `right end`, `bottom start` or `bottom end`. The `inner` placements cover the field.
 * Defaults to *bottom*.
 *
 * @property {(event) => void} onFocus - Called when the input field gains focus; the options list opens
 * when there are options to show.
 *
 * @property {(event) => void} onBlur - Called when the input field loses focus; the options list closes.
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
  placement = 'bottom',
  testID,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  onSubmitEditing: onSubmitEditingProp,
  ...inputProps
}, ref) => {
  const [listVisible, setListVisible] = useState(false);
  const inputRef = useRef<InputRef>(null);
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

  // The list floats above the app without a backdrop (#1578), so nothing outside the component
  // reports an outside tap. Closing the keyboard is the one signal the platform gives for
  // "done with this field" that does not come through the input itself.
  useEffect(() => {
    if (!listVisible) {
      return;
    }
    const subscription = Keyboard.addListener('keyboardDidHide', () => {
      setListVisible(false);
    });
    return () => subscription.remove();
  }, [listVisible]);

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

  const onInputBlur = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setOptionsListInvisible();
    onBlurProp?.(event);
  }, [setOptionsListInvisible, onBlurProp]);

  const onInputSubmitEditing = useCallback((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void => {
    setOptionsListInvisible();
    onSubmitEditingProp?.(e);
  }, [setOptionsListInvisible, onSubmitEditingProp]);

  const onItemPress = useCallback((index: number): void => {
    if (onSelect) {
      setOptionsListInvisible();
      onSelect(index);
    }
  }, [onSelect, setOptionsListInvisible]);

  const renderItem = useCallback((info: ListRenderItemInfo<AutocompleteItemElement>): AutocompleteItemElement => {
    return React.cloneElement(info.item, { onPress: () => onItemPress(info.index) });
  }, [onItemPress]);

  const renderInputElement = useCallback((): InputElement => {
    return (
      <View>
        <Input
          {...inputProps}
          ref={inputRef}
          testID={testID ? `@${testID}/input` : '@autocomplete/input'}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onSubmitEditing={onInputSubmitEditing}
        />
      </View>
    );
  }, [inputProps, testID, onInputFocus, onInputBlur, onInputSubmitEditing]);

  return (
    <Popover
      style={styles.popover}
      placement={placement}
      testID={testID}
      visible={listVisible}
      fullWidth={true}
      blocking={false}
      anchor={renderInputElement}
    >
      <List
        {...listWebProps()}
        style={styles.list}
        keyboardShouldPersistTaps='always'
        data={data}
        bounces={false}
        renderItem={renderItem}
      />
    </Popover>
  );
});

AutocompleteComponent.displayName = 'Autocomplete';

export const Autocomplete = memo(AutocompleteComponent);
Autocomplete.displayName = 'Autocomplete';

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

