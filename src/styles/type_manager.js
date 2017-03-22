import {DefaultTypes} from './default_types.js';
import _ from 'lodash'

export const TypeManager = class {
  static _userTypes = [];
  static _themableTypes = {};

  static types = (theme) => {

    let themedTypes = {};

    _.forOwn(TypeManager._themableTypes, (value, key) => {
      _.set(themedTypes, key, value(theme))
    });

    let res = _.merge(DefaultTypes(theme), themedTypes, TypeManager._userTypes);
    return res;
  };

  static setType = (element, name, value) => {
    _.set(TypeManager._userTypes, [[element], [name]], value);
  };

  static registerTypes = (element, types) => {
    _.set(TypeManager._themableTypes, [element], types);
  }
};