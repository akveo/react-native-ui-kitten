import React from 'react';
import {
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacityProps,
} from 'react-native';

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type Override<T, U> = Omit<T, keyof U> & U;

export type TouchableIndexedProps = Override<TouchableOpacityProps, {
  onPress?: (index: number, event: GestureResponderEvent) => void;
  onPressIn?: (index: number, event: GestureResponderEvent) => void;
  onPressOut?: (index: number, event: GestureResponderEvent) => void;
  onLongPress?: (index: number, event: GestureResponderEvent) => void;
}>;

export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;
export type InputFocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

export interface ModalPresentingBased {
  children?: React.ReactNode;
  allowBackdrop?: boolean;
  onBackdropPress: () => void;
}
