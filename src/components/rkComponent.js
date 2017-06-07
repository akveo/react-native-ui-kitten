import React, {Component} from 'react';
import {Platform} from 'react-native';
import _ from 'lodash';
import {TypeManager} from '../styles/typeManager.js';
import {RkTheme} from '../styles/themeManager.js';

/**
 * RkComponent is component
 */
export class RkComponent extends Component {

  //default section used to configure control styles
  /**
   * {string} Name of component
   */
  componentName = '';
  /**
   * {object} mapping
   */
  typeMapping = {};
  /**
   * {string} base style name
   */
  baseStyle = '_base';

  /**
   * {string} default type name
   */
  defaultType = 'basic';

  /**
   * used to compile rkTypes
   * @param {string} additionalTypes
   * @returns {array} styles
   */
  defineStyles(additionalTypes) {
    let rkTypes = this.props.rkType || '';
    let types = _.join([this.defaultType, rkTypes, additionalTypes], ' ');
    types = types && types.length ? types.split(' ') : [];
    return this._getTypes(types);
  }

  /**
   * Extracts non style value
   * @param {string} styles
   * @param {string} property
   * @returns {object} something
   */
  extractNonStyleValue(styles, property) {
    let val = _.find(styles, (e) => e.hasOwnProperty(property));
    if (val) {
      styles.splice(styles.indexOf(val), 1);
    }
    else {
      return val;
    }
    return val[property];
  }

  _getStyleValue(value) {
    if (typeof value === 'object' && value !== null) {
      if (value.hasOwnProperty(Platform.OS)) {
        value = this._getStyleValue(value[Platform.OS]);
      }
    } else if (typeof value === 'function') {
      value = value(RkTheme.current);
    }
    return value;
  }

  _getTypes(types) {
    let componentTypes = TypeManager.types(RkTheme.current)[this.componentName] || [];

    let styles = this._getDefaultStyles(componentTypes);

    let usedTypes = [];
    types.forEach(type => {
      if (componentTypes[type])
        usedTypes.push(componentTypes[type]);
    });

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
                let value = this._getStyleValue(usedTypes[type][key][styleKey]);
                this._mergeStyles(styles[key], styleKey, value);
              }
            } else {
              let styleKey = this.typeMapping[element][key];
              let value = this._getStyleValue(usedTypes[type][key]);

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
    let self = this;
    for (let element in baseStyle) {
      styles[element] = Object.keys(baseStyle[element]).map(function (key) {
        let value = self._getStyleValue(baseStyle[element][key]);
        return {[key]: value};
      })
    }
    return styles;
  };

}