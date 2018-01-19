import {DefaultTypes} from './defaultTypes.js';
import {RkTheme} from './themeManager.js';
import {Platform} from 'react-native';
import _ from 'lodash'

export class TypeManager {
  static _userTypes = [];
  static _themedTypes;
  static _themableTypes = {};

  static types = (theme) => {
    if (!TypeManager._themedTypes) {
      TypeManager._themedTypes = {};
      _.forOwn(TypeManager._themableTypes, (value, key) => {
        _.set(TypeManager._themedTypes, key, value(theme))
      });

      TypeManager._themedTypes = _.merge(DefaultTypes(theme), TypeManager._themedTypes, TypeManager._userTypes);
    }
    return TypeManager._themedTypes;
  };

  static setType = (element, name, value, parentTypes) => {
    if (typeof parentTypes === "string")
      parentTypes = parentTypes.split(' ');
    let newType = TypeManager._createType(value, parentTypes, element);
    _.set(TypeManager._userTypes, [[element], [name]], newType);
    TypeManager.invalidateTypes();
  };

  static registerTypes = (element, types) => {
    _.set(TypeManager._themableTypes, [element], types);
    TypeManager.invalidateTypes();
  };

  static invalidateTypes = () => {
    TypeManager._themedTypes = undefined;
  };

  static _createType = (type, parentTypes, componentName) => {
    let newType = {};
    if (parentTypes && parentTypes.length > 0) {
      parentTypes.forEach(
        (typeName) => {
          TypeManager._mergeTypes(newType, TypeManager.types(RkTheme.current)[componentName][typeName]);
        }
      );
      TypeManager._mergeTypes(newType, type);
    } else {
      newType = type;
    }
    return newType
  };

  static _mergeTypes = (baseType, typeForMerge) => {
    let typeForMergeValue, baseTypeValue;
    for (let key in typeForMerge) {
      baseTypeValue = TypeManager._getStyleValue(baseType[key]);
      typeForMergeValue = TypeManager._getStyleValue(typeForMerge[key]);
      if (baseTypeValue){
        if (typeof typeForMergeValue === 'object'){
          typeof baseTypeValue !== 'object' && (baseType[key] = {});
          TypeManager._mergeTypes(baseType[key], typeForMerge[key]);
        } else {
          baseType[key] = typeForMergeValue;
        }
      } else {
        baseType[key] = typeForMergeValue;
      }
    }
  };

  static _getStyleValue = (value) => {
    let styleValue = value;
    if (typeof value === 'object' && value !== null) {
      styleValue = value.hasOwnProperty(Platform.OS)
        ? TypeManager._getStyleValue(value[Platform.OS])
        : Object.create(value);
    } else if (typeof value === 'function') {
      styleValue = value(RkTheme.current);
    }
    return styleValue;
  }
};