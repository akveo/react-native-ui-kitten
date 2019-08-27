import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const FeatherIconsPack = {
  name: 'feather',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy({}, {
    get(target, name) {
      return IconProvider(name);
    },
  });
}

function IconProvider(name) {
  return {
    toReactElement: (props) => FeatherIcon({ name, ...props }),
  };
}

function FeatherIcon(props) {
  const { name, style } = props;
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Feather
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
    />
  );
}
