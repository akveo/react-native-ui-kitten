// Ref positions holding types that have nothing to do with UI Kitten.
import React from 'react';
import { View, TextInput } from 'react-native';

export const viewRef = React.useRef<View>(null);
export const inputRef = React.useRef<TextInput>(null);
export const domRef = React.useRef<HTMLInputElement>(null);
export const forwarded = React.forwardRef<View, { label: string }>((props, ref) => (
  <View ref={ref}>{props.label}</View>
));
