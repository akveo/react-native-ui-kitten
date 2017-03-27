import React, {Component} from 'react';
import _ from 'lodash';
import {TypeManager} from '../styles/typeManager.js';
import {RkTheme} from '../styles/theme.js';


export class RkComponent extends Component {

  //default section used to configure control styles
  componentName = '';
  typeMapping = {};
  baseStyle = '_base';
  defaultType = 'basic';

  defineStyles(additionalTypes) {
    let rkTypes = this.props.rkType || "";
    let types = _.join([this.defaultType, rkTypes, additionalTypes], " ");
    types = types && types.length ? types.split(" ") : [];
    return this._getTypes(types);
  }

  _getTypes(types) {
    let componentTypes = TypeManager.types(RkTheme.current)[this.componentName] || [];

    let styles = this._getDefaultStyles(componentTypes);

    let usedTypes = [];
    types.forEach(type => {
      if (componentTypes[type])
        usedTypes.push(componentTypes[type]);
    });


    // let usedTypes = _.pickBy(componentTypes, function (value, key) {
    //   return types.includes(key);
    // });

    for (let type in usedTypes) {
      for (let key in usedTypes[type]) {
        for (let element in this.typeMapping) {
          if (this.typeMapping.hasOwnProperty(key)
            || this.typeMapping[element].hasOwnProperty(key)) {

            if (styles[element] === undefined) {
              styles[element] = [];
            }

            //check if this is complex style
            if (this.typeMapping[key]) {
              for (let styleKey in usedTypes[type][key]) {
                let value = usedTypes[type][key][styleKey];
                this._mergeStyles(styles[key], styleKey, value);
              }
            } else {

              let styleKey = this.typeMapping[element][key];
              let value = usedTypes[type][key];
              this._mergeStyles(styles[element], styleKey, value);
            }
            break;
          }
        }
      }
    }
    return styles;
  };

  _mergeStyles(element, styleKey, value) {
    //merge styles in order to have only one value for each property
    let index = _.findIndex(element, (e) => e.hasOwnProperty(styleKey));
    if (index > 0)
      element[index][styleKey] = value;
    else
      element.push({[styleKey]: value});
  }

  _getDefaultStyles(componentTypes) {
    let styles = {};
    let baseStyle = componentTypes[this.baseStyle];
    for (let element in baseStyle) {
      styles[element] = Object.keys(baseStyle[element]).map(function (key) {
        return {[key]: baseStyle[element][key]};
      })
    }
    return styles;
  };
}