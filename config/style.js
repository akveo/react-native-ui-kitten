import {
  StyleSheet,
} from 'react-native';

import _ from "lodash";

import {
  Colors
} from './color';


export const RkStyle = StyleSheet.create(
  _.merge({
    rounded:{
      borderRadius: 1000,
    }
  }, createColorsStyles(Colors))
);

function createColorsStyles(colors) {
  let styleObject = {};
  for (let colorName in colors) {
    styleObject[colorName + 'Text'] = {
      color: colors[colorName]
    };
    styleObject[colorName + 'Bg'] = {
      backgroundColor: colors[colorName]
    };
    styleObject[colorName + 'Border'] = {
      borderColor: colors[colorName]
    };
  }
  return styleObject;
}