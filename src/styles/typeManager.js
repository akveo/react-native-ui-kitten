import { Platform } from 'react-native';
import _ from 'lodash';
import { DefaultTypes } from './defaultTypes';
import { RkTheme } from './themeManager';

export class TypeManager {
  static userTypes = [];
  static themedTypes;
  static themableTypes = {};

  static types = (theme) => {
    if (!TypeManager.themedTypes) {
      TypeManager.themedTypes = {};
      _.forOwn(TypeManager.themableTypes, (value, key) => {
        _.set(TypeManager.themedTypes, key, value(theme));
      });

      TypeManager.themedTypes = _.merge(
        DefaultTypes(theme),
        TypeManager.themedTypes,
        TypeManager.userTypes,
      );
    }
    return TypeManager.themedTypes;
  };

  static setType = (element, name, value, parentTypes) => {
    let parentTypesValue = parentTypes;
    if (typeof parentTypes === 'string') {
      parentTypesValue = parentTypes.split(' ');
    }
    const newType = TypeManager.createType(value, parentTypesValue, element);
    _.set(TypeManager.userTypes, [[element], [name]], newType);
    TypeManager.invalidateTypes();
  };

  static registerTypes = (element, types) => {
    _.set(TypeManager.themableTypes, [element], types);
    TypeManager.invalidateTypes();
  };

  static invalidateTypes = () => {
    TypeManager.themedTypes = undefined;
  };

  static createType = (sourceType, parentTypes, componentName) => {
    if (parentTypes && parentTypes.length > 0) {
      let newType = {};
      parentTypes.forEach(parentType => {
        const componentTypes = TypeManager.types(RkTheme.current)[componentName][parentType];
        newType = TypeManager.mergeTypes(newType, componentTypes);
      });
      return TypeManager.mergeTypes(newType, sourceType);
    }
    return sourceType;
  };

  static mergeTypes = (sourceType, mergeType) => {
    const mergeResult = sourceType;
    Object.keys(mergeType).forEach(key => {
      mergeResult[key] = TypeManager.getBaseTypeMergeValue(sourceType, mergeType, key);
    });
    return mergeResult;
  };

  static getBaseTypeMergeValue(baseType, mergeType, key) {
    const baseStyleValue = TypeManager.getStyleValue(baseType[key]);
    const mergeStyleValue = TypeManager.getStyleValue(mergeType[key]);
    let value = {};
    if (baseStyleValue) {
      if (typeof mergeStyleValue === 'object') {
        if (typeof baseStyleValue !== 'object') {
          value = {};
        }
        TypeManager.mergeTypes(baseType[key], mergeType[key]);
      } else {
        value = mergeStyleValue;
      }
    } else {
      value = mergeStyleValue;
    }
    return value;
  }

  static getStyleValue = (value) => {
    let styleValue = value;
    if (typeof value === 'object' && value !== null) {
      const isPlatformSpecified = Object.prototype.hasOwnProperty.call(value, Platform.OS);
      if (isPlatformSpecified) {
        styleValue = TypeManager.getStyleValue(value[Platform.OS]);
      } else {
        styleValue = Object.create(value);
      }
    } else if (typeof value === 'function') {
      styleValue = value(RkTheme.current);
    }
    return styleValue;
  }
}
