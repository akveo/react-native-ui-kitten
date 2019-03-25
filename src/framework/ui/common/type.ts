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
export interface TouchableOpacityIndexedProps extends TouchableOpacityProps {
  onPress?: (event: GestureResponderEvent, index: number) => void;
  onPressIn?: (event: GestureResponderEvent, index: number) => void;
  onPressOut?: (event: GestureResponderEvent, index: number) => void;
  onLongPress?: (event: GestureResponderEvent, index: number) => void;
}
