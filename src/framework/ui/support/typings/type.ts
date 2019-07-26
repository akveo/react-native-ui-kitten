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

export type TouchableTypeReturningProps<T> = Override<TouchableOpacityProps, {
  onPress?: (item: T, event: GestureResponderEvent) => void;
  onPressIn?: (item: T, event: GestureResponderEvent) => void;
  onPressOut?: (item: T, event: GestureResponderEvent) => void;
  onLongPress?: (item: T, event: GestureResponderEvent) => void;
}>;

export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;
export type InputFocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

export interface ModalPresentingBased {
  children?: React.ReactNode;
  allowBackdrop?: boolean;
  onBackdropPress: () => void;
}
