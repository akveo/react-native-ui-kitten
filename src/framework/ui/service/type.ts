import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextInputFocusEventData,
  TextInputEndEditingEventData,
} from 'react-native';

export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;
export type InputFocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;
export type InputEndEditEvent = NativeSyntheticEvent<TextInputEndEditingEventData>;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
