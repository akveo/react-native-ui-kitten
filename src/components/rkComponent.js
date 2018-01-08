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
   * {string} Default typeMappingElement for component. Will be taken first element if not defined. Can be overridden in inherited component.
   */
  defaultTypeMappingElement = undefined;

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
   * Example: `placeholderTextColor` of `TextInput` component. For some reason this setting should be passed separately from `style` prop.
   * So we keep `placeholderTextColor` as style property of `RkTextInput` but before applying to internal `TextInput` - we extract this value and pass it to according prop. For more details, see Customization section.
   *
   * @param {object} style - Style which contains non-style property
   * @param {string} property - name of property that should be extracted.
   * @returns {object} value of extracted property
   */
  extractNonStyleValue(style, property) {
    let val = _.find(style, (e) => e.hasOwnProperty(property));
    if (val) {
      style.splice(style.indexOf(val), 1);
    } else {
      return val;
    }
    return val[property];
  }

  _getTypesString(types) {
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
    let componentTypes = TypeManager.types(RkTheme.current)[this.componentName] || [];
    let styles = {};
    let baseStyle = componentTypes[this.baseStyle];

    if (baseStyle) {
      usedTypes = [baseStyle, ...usedTypes];
    }

    usedTypes.forEach((usedType) => {
      for (let key in usedType) {
        if (this.typeMapping.hasOwnProperty(key)) {
          this.fillElementStyles(styles, key, usedType[key]);
        } else {
          let element = this.findTypeMappingElementByKey(key, this.typeMapping)
            || this.defaultTypeMappingElement || _.keys(this.typeMapping)[0];
          this.fillElementStyle(styles, element, key, usedType[key]);
        }
      }
    });

    return styles;
  };

  fillElementStyle(styles, element, key, value) {
    this.createStyleIfNotExists(styles, element);
    let styleKey = this.typeMapping[element][key];
    if (!styleKey)
      styleKey = key;
    let styleValue = this._getStyleValue(value);
    this._mergeStyles(styles[element], styleKey, styleValue);
  }

  fillElementStyles(styles, element, value) {
    for (let styleKey in value) {
      this.fillElementStyle(styles, element, styleKey, value[styleKey])
    }
  }

  createStyleIfNotExists(styles, key) {
    styles[key] === undefined && (styles[key] = []);
  }

  findTypeMappingElementByKey(key, typeMapping) {
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
    if (index >= 0)
      element[index][styleKey] = value;
    else
      element.push({[styleKey]: value});
  }

  _getUsedTypes(rkTypes) {
    let usedTypes = [];
    let componentTypes = TypeManager.types(RkTheme.current)[this.componentName] || [];
    rkTypes.forEach(type => {
      if (componentTypes[type])
        usedTypes.push(componentTypes[type]);
    });
    return usedTypes;
  }
}