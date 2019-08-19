import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const MaterialCommunityIconsPack = {
  name: 'material-community',
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
    toReactElement: (props) => MaterialCommunityIcon({ name, ...props }),
  };
}

function MaterialCommunityIcon(props) {
  const { name, style } = props;
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <MaterialCommunityIcons
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
    />
  );
}
