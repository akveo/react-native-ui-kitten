import {DefaultTypes} from './defaultTypes.js';
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

  static setType = (element, name, value) => {
    _.set(TypeManager._userTypes, [[element], [name]], value);
    TypeManager.invalidateTypes();
  };

  static registerTypes = (element, types) => {
    _.set(TypeManager._themableTypes, [element], types);
    TypeManager.invalidateTypes();
  };

  static invalidateTypes = () => {
    TypeManager._themedTypes = undefined;
  }
};
