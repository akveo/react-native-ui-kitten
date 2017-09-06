import React from 'react';
import {Platform} from 'react-native';
import _ from 'lodash';
import {TypeManager} from '../styles/typeManager.js';
import {RkTheme} from '../styles/themeManager.js';

/**
 * `RkComponent` is base component for all components in `react-native-ui-kitten` library
 * This component includes core logic for stylization and theming. All themable components should extend this component.
 * @extends React.Component
 */
export class RkComponent extends React.Component {

  /**
   * {string} Name of component. Should be overridden in inherited component.
   */
  componentName = '';

  /**
   * {object} Mapping which used for defining predefined properties such as `color` in `RkButton`. Can be overridden in inherited component
   */
  typeMapping = {};

  /**
   * {string} Default component style name. Can be overridden in inherited component
   */
  baseStyle = '_base';

  /**
   * {string} Default type name for component. Can be overridden in inherited component.
   */
  defaultType = 'basic';

  /**
   * Used to collect and compile all rkTypes into styles. Returns object with styles for all internal components.
   * @param {string} additionalTypes - Sometimes inherited component need to apply additional type implicitly.
   * For example - if component state is `selected` component may ask about `selected` type.
   * @returns {object} styles - Object with compiled styles for each internal component.
   */
  defineStyles(additionalTypes) {
    let rkTypes = this._getTypesString(this.props.rkType || '');
    additionalTypes = this._getTypesString(additionalTypes);
    let types = this._getTypesString([this.defaultType, rkTypes, additionalTypes]);
    types = types && types.length ? types.split(' ') : [];
    return this._getTypes(types);
  }

  /**
   * Extracts property value from type. Often used if need to control non-style properties using types.
   * Example - `placeholderTextColor` of `TextInput` component. For some reason this setting should be passed separately from `style` prop.
   * So we keep `placeholderTextColor` as style property of `RkTextInput` but before applying to internal `TextInput` - we extract this value and pass it to according prop.
   * @param {object} styles - Styles which contains non-style property
   * @param {string} property - name of property that should be extracted.
   * @returns {object} value of extracted property
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

  _getTypesString(types){
    let typesString = types;
    if (Array.isArray(types)) {
      typesString = _.join(types, ' ');
    }
    return typesString;
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

  _getTypes(rkTypes) {
    let usedTypes = this._getUsedTypes(rkTypes);
    let styles = this._getDefaultStyles();

    usedTypes.forEach((usedType) => {
      for (let key in usedType) {
        if (this.typeMapping.hasOwnProperty(key)) {
          styles[key] === undefined && (styles[key] = []);
          for (let styleKey in usedType[key]) {
            let value = this._getStyleValue(usedType[key][styleKey]);
            this._mergeStyles(styles[key], styleKey, value);
          }
        } else {
          let complexStyle = this._findComplexStyleByKey(key, this.typeMapping);
          if (complexStyle){
            styles[complexStyle] === undefined && (styles[complexStyle] = []);
            let styleKey = this.typeMapping[complexStyle][key];
            let value = this._getStyleValue(usedType[key]);
            this._mergeStyles(styles[complexStyle], styleKey, value);
          }
        }
      }
    });

    return styles;
  };

  _findComplexStyleByKey(key, typeMapping){
    let resultComplexStyle;
    for (let complexStyle in typeMapping) {
      if (typeMapping[complexStyle].hasOwnProperty(key)) {
        resultComplexStyle = complexStyle;
        break;
      }
    }
    return resultComplexStyle;
  }

  _mergeStyles(element, styleKey, value) {
    //merge styles in order to have only one value for each property
    let index = _.findIndex(element, (e) => e.hasOwnProperty(styleKey));
    if (index > 0)
      element[index][styleKey] = value;
    else
      element.push({[styleKey]: value});
  }

  _getDefaultStyles() {
    let styles = {};
    let componentTypes = TypeManager.types(RkTheme.current)[this.componentName] || [];
    let baseStyle = componentTypes[this.baseStyle];
    let self = this;
    for (let element in baseStyle) {
      styles[element] = Object.keys(baseStyle[element]).map(function (key) {
        let value = self._getStyleValue(baseStyle[element][key]);
        return {[key]: value};
      })
    }
    return styles;
  }

  _getUsedTypes(rkTypes){
    let usedTypes = [];
    let componentTypes = TypeManager.types(RkTheme.current)[this.componentName] || [];
    rkTypes.forEach(type => {
      if (componentTypes[type])
        usedTypes.push(componentTypes[type]);
    });
    return usedTypes;
  }
}