import React from 'react';
import {
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TouchableOpacityProps,
} from 'react-native';
import { PopoverProps } from '@kitten/ui';

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type Override<T, U> = Omit<T, keyof U> & U;

// Popover-based element with a child element with props of type T;
// E.g Button wrapped in popover:
//
// type PopoverButton = PopoverBaseWrapped<PopoverProps, ButtonProps>

export type PopoverBaseWrapped<P extends PopoverProps, T> = Override<P, {
  children: React.ReactElement<T>;
}>;

export type TouchableIndexedProps = Override<TouchableOpacityProps, {
  onPress?: (index: number, event: GestureResponderEvent) => void;
  onPressIn?: (index: number, event: GestureResponderEvent) => void;
  onPressOut?: (index: number, event: GestureResponderEvent) => void;
  onLongPress?: (index: number, event: GestureResponderEvent) => void;
}>;

export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;
export type InputFocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;
export type InputEndEditEvent = NativeSyntheticEvent<TextInputEndEditingEventData>;
