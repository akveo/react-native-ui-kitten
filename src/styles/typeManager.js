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

  static createType = (type, parentTypes, componentName) => {
    let newType = {};
    if (parentTypes && parentTypes.length > 0) {
      parentTypes.forEach((typeName) => {
        TypeManager.mergeTypes(
          newType,
          TypeManager.types(RkTheme.current)[componentName][typeName],
        );
      });
      TypeManager.mergeTypes(newType, type);
    } else {
      newType = type;
    }
    return newType;
  };

  static mergeTypes = (baseType, typeForMerge) => {
    let baseStyleValue;
    let mergeStyleValue;
    Object.keys(typeForMerge).forEach(key => {
      baseStyleValue = TypeManager.getStyleValue(baseType[key]);
      mergeStyleValue = TypeManager.getStyleValue(typeForMerge[key]);
      if (baseStyleValue) {
        if (typeof mergeStyleValue === 'object') {
          if (typeof baseStyleValue !== 'object') {
            baseType[key] = {};
          }
          TypeManager.mergeTypes(baseType[key], typeForMerge[key]);
        } else {
          baseType[key] = mergeStyleValue;
        }
      } else {
        baseType[key] = mergeStyleValue;
      }
    });
  };

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
