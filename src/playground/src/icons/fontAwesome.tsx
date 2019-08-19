import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export const FontAwesomeIconsPack = {
  name: 'font-awesome',
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
    toReactElement: (props) => FontAwesomeIcon({ name, ...props }),
  };
}

function FontAwesomeIcon(props) {
  const { name, style } = props;
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <FontAwesome
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
    />
  );
}
