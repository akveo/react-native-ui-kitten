import {DefaultTypes} from './default_types.js';
import _ from 'lodash'

export const TypeManager = class {
  static userTypes = [];

  static types = (theme) => {
    return _.merge(DefaultTypes(theme), TypeManager.userTypes);
  };

  static setType = (element, name, value) => {
    _.set(TypeManager.userTypes, [[element], [name]], value);
  }
};