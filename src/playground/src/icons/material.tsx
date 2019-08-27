import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const MaterialIconsPack = {
  name: 'material',
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
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  };
}

function MaterialIcon(props) {
  const { name, style } = props;
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <MaterialIcons
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
    />
  );
}
