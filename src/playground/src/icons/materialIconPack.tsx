import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppIconRegistry } from '@pg/icons';

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

const IconProvider = (name) => ({
  toReactElement: (props) => MaterialIcon({ name, ...props }),
});

const MaterialIconRegistry: AppIconRegistry = {
  ['arrow-ios-downward']: 'keyboard-arrow-down',
  ['arrow-ios-upward']: 'keyboard-arrow-up',
  ['arrow-back']: 'arrow-back',
  ['color-palette']: 'palette',
  ['grid']: 'dashboard',
  ['list']: 'list',
  ['menu']: 'menu',
  ['more-vertical']: 'more-vert',
  ['search']: 'search',
  ['settings']: 'settings',
  ['star']: 'star',
  ['trash']: 'delete',
};

function MaterialIcon(props) {
  const { name, style } = props;
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <MaterialIcons
      name={MaterialIconRegistry[name]}
      size={height}
      color={tintColor}
      style={iconStyle}
    />
  );
}
