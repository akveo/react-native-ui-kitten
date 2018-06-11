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
    if (typeof parentTypes === 'string') {
      parentTypes = parentTypes.split(' ');
    }
    const newType = TypeManager.createType(value, parentTypes, element);
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
    let typeForMergeValue,
      baseTypeValue;
    for (const key in typeForMerge) {
      baseTypeValue = TypeManager.getStyleValue(baseType[key]);
      typeForMergeValue = TypeManager.getStyleValue(typeForMerge[key]);
      if (baseTypeValue) {
        if (typeof typeForMergeValue === 'object') {
          typeof baseTypeValue !== 'object' && (baseType[key] = {});
          TypeManager.mergeTypes(baseType[key], typeForMerge[key]);
        } else {
          baseType[key] = typeForMergeValue;
        }
      } else {
        baseType[key] = typeForMergeValue;
      }
    }
  };

  static getStyleValue = (value) => {
    let styleValue = value;
    if (typeof value === 'object' && value !== null) {
      styleValue = value.hasOwnProperty(Platform.OS)
        ? TypeManager.getStyleValue(value[Platform.OS])
        : Object.create(value);
    } else if (typeof value === 'function') {
      styleValue = value(RkTheme.current);
    }
    return styleValue;
  }
}
