import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TypeManager } from '../styles/typeManager';
import { RkTheme } from '../styles/themeManager';

/**
 * `RkComponent` is base component for all components in `react-native-ui-kitten` library
 * This component includes core logic for stylization and theming.
 * All themable components should extend this component.
 * @extends React.Component
 */
export class RkComponent extends React.Component {
  static propTypes = {
    rkType: PropTypes.string,
  };
  static defaultProps = {
    rkType: '',
  };
  /**
   * {string} Name of component. Should be overridden in inherited component.
   */
  componentName = '';

  /**
   * {object} Mapping which used for defining predefined properties such as `color` in `RkButton`.
   * Can be overridden in inherited component
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
   * {string} Default typeMappingElement for component. Will be taken first element if not defined.
   * Can be overridden in inherited component.
   */
  defaultTypeMappingElement = undefined;

  /**
   * Used to collect and compile all rkTypes into styles.
   * Returns object with styles for all internal components.
   * @param {string} additionalTypes - Sometimes inherited component need
   * to apply additional type implicitly.
   * For example - if component state is `selected` component may ask about `selected` type.
   * @returns {object} styles - Object with compiled styles for each internal component.
   */
  defineStyles(additionalTypes) {
    const rkTypes = this.getTypesString(this.props.rkType);
    additionalTypes = this.getTypesString(additionalTypes);
    let types = this.getTypesString([this.defaultType, rkTypes, additionalTypes]);
    types = types && types.length ? types.split(' ') : [];
    return this.getTypes(types);
  }

  /**
   * Extracts property value from type.
   * Often used if need to control non-style properties using types.
   * Example: `placeholderTextColor` of `TextInput` component.
   * For some reason this setting should be passed separately from `style` prop.
   * So we keep `placeholderTextColor` as style property of `RkTextInput` but before applying to
   * internal `TextInput` - we extract this value and pass it to according prop.
   * For more details, see Customization section.
   *
   * @param {object} style - Style which contains non-style property
   * @param {string} property - name of property that should be extracted.
   * @returns {object} value of extracted property
   */
  extractNonStyleValue(style, property) {
    const val = _.find(style, (e) => Object.prototype.hasOwnProperty.call(e, property));
    if (val) {
      style.splice(style.indexOf(val), 1);
    } else {
      return val;
    }
    return val[property];
  }

  getTypesString(types) {
    let typesString = types;
    if (Array.isArray(types)) {
      typesString = _.join(types, ' ');
    }
    return typesString;
  }

  getStyleValue(value) {
    if (typeof value === 'object' && value !== null) {
      if (Object.prototype.hasOwnProperty.call(value, Platform.OS)) {
        value = this.getStyleValue(value[Platform.OS]);
      }
    } else if (typeof value === 'function') {
      value = value(RkTheme.current);
    }
    return value;
  }

  getTypes(rkTypes) {
    let usedTypes = this.getUsedTypes(rkTypes);
    const componentTypes = TypeManager.types(RkTheme.current)[this.componentName] || [];
    const styles = {};
    const baseStyle = componentTypes[this.baseStyle];

    if (baseStyle) {
      usedTypes = [baseStyle, ...usedTypes];
    }

    usedTypes.forEach((usedType) => {
      Object.keys(usedType).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(this.typeMapping, key)) {
          this.fillElementStyles(styles, key, usedType[key]);
        } else {
          const element = this.findTypeMappingElementByKey(key, this.typeMapping)
            || this.defaultTypeMappingElement || _.keys(this.typeMapping)[0];
          this.fillElementStyle(styles, element, key, usedType[key]);
        }
      });
    });

    return styles;
  }

  fillElementStyle(styles, element, key, value) {
    this.createStyleIfNotExists(styles, element);
    let styleKey = this.typeMapping[element][key];
    if (!styleKey) {
      styleKey = key;
    }
    const styleValue = this.getStyleValue(value);
    this.mergeStyles(styles[element], styleKey, styleValue);
  }

  fillElementStyles(styles, element, value) {
    Object.keys(value).forEach(key => {
      this.fillElementStyle(styles, element, key, value[key]);
    });
  }

  createStyleIfNotExists(styles, key) {
    if (styles[key] === undefined) {
      styles[key] = [];
    }
  }

  findTypeMappingElementByKey(key, typeMapping) {
    // eslint-disable-next-line array-callback-return
    return Object.keys(typeMapping).find(typeKey => {
      Object.prototype.hasOwnProperty.call(typeMapping, typeKey);
    });
  }

  mergeStyles(element, styleKey, value) {
    // merge styles in order to have only one value for each property
    const index = _.findIndex(element, (e) => Object.prototype.hasOwnProperty.call(e, styleKey));
    if (index >= 0) {
      element[index][styleKey] = value;
    } else {
      element.push({ [styleKey]: value });
    }
  }

  getUsedTypes(rkTypes) {
    const usedTypes = [];
    const componentTypes = TypeManager.types(RkTheme.current)[this.componentName] || [];
    rkTypes.forEach(type => {
      if (componentTypes[type]) {
        usedTypes.push(componentTypes[type]);
      }
    });
    return usedTypes;
  }
}
