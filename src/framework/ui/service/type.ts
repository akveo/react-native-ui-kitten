import {
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
