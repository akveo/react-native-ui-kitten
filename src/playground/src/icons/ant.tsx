import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const AntDesignIconsPack = {
  name: 'ant',
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
    toReactElement: (props) => AntDesignIcon({ name, ...props }),
  };
}

function AntDesignIcon(props) {
  const { name, style } = props;
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <AntDesign
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
    />
  );
}
