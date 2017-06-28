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
    let rkTypes = this.props.rkType || '';
    let types = _.join([this.defaultType, rkTypes, additionalTypes], ' ');
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