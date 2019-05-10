import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextInputFocusEventData,
  TextInputEndEditingEventData,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';

export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;
export type InputFocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;
export type InputEndEditEvent = NativeSyntheticEvent<TextInputEndEditingEventData>;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// @ts-ignore: props override
export interface TouchableIndexedProps extends TouchableOpacityProps {
  onPress?: (index: number, event: GestureResponderEvent) => void;
  onPressIn?: (index: number, event: GestureResponderEvent) => void;
  onPressOut?: (index: number, event: GestureResponderEvent) => void;
  onLongPress?: (index: number, event: GestureResponderEvent) => void;
}
