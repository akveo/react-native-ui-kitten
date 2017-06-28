import {DefaultTypes} from './defaultTypes.js';
import _ from 'lodash'

export const TypeManager = class {
  static _userTypes = [];
  static _themedTypes;
  static _themableTypes = {};

  static types = (theme) => {
    if (!this._themedTypes) {
      this._themedTypes = {};
      _.forOwn(TypeManager._themableTypes, (value, key) => {
        _.set(this._themedTypes, key, value(theme))
      });

      this._themedTypes = _.merge(DefaultTypes(theme), this._themedTypes, TypeManager._userTypes);
    }
    return this._themedTypes;
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
    this._themedTypes = undefined;
  }
};