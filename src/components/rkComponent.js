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
  defaultTypeMappingStyleKey = undefined;

  /**
   * Used to collect and compile all rkTypes into styles.
   * Returns object with styles for all internal components.
   * @param {string} additionalTypes - Sometimes inherited component need
   * to apply additional type implicitly.
   * For example - if component state is `selected` component may ask about `selected` type.
   * @returns {object} styles - Object with compiled styles for each internal component.
   */
  defineStyles(additionalTypes) {
    const sourceTypes = this.getTypesString(this.props.rkType);
    const customTypes = this.getTypesString(additionalTypes);
    let types = this.getTypesString([this.defaultType, sourceTypes, customTypes]);
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
        return this.getStyleValue(value[Platform.OS]);
      }
    } else if (typeof value === 'function') {
      return value(RkTheme.current);
    }
    return value;
  }

  getTypes(rkTypes) {
    const componentTypes = TypeManager.types(RkTheme.current)[this.componentName] || [];
    const baseStyle = componentTypes[this.baseStyle];

    let usedTypes = this.getUsedTypes(rkTypes);
    usedTypes = baseStyle === undefined ? usedTypes : [baseStyle, ...usedTypes];

    const styles = {};

    usedTypes.forEach((usedType) => {
      Object.keys(usedType).forEach(key => {
        const usedTypeValue = usedType[key];
        if (Object.prototype.hasOwnProperty.call(this.typeMapping, key)) {
          Object.keys(usedTypeValue).forEach(typeKey => {
            styles[key] = this.getElementStyle(styles, key, typeKey, usedType[key][typeKey]);
          });
        } else {
          let typeMappingKey = this.findTypeMappingKeyByStyleKey(key);
          typeMappingKey = typeMappingKey || _.keys(this.typeMapping)[0];
          styles[typeMappingKey] = this.getElementStyle(styles, typeMappingKey, key, usedTypeValue);
        }
      });
    });
    return styles;
  }

  getElementStyle(styles, element, key, value) {
    const style = styles[element] || [];
    const styleKey = this.getElementStyleKey(element, style, key);
    style[styleKey.index] = { [styleKey.name]: this.getStyleValue(value) };
    return style;
  }

  getElementStyleKey(element, style, key) {
    const name = this.typeMapping[element][key] || key;
    const index = this.findElementStyleKeyIndex(style, name);
    return { name, index };
  }

  findElementStyleKeyIndex(element, style) {
    const index = _.findIndex(element, (e) => Object.prototype.hasOwnProperty.call(e, style));
    return index >= 0 ? index : element.length;
  }

  findTypeMappingKeyByStyleKey(styleKey) {
    // eslint-disable-next-line arrow-body-style
    const typeMappingKey = Object.keys(this.typeMapping).find(style => {
      return Object.prototype.hasOwnProperty.call(this.typeMapping[style], styleKey);
    });
    return typeMappingKey || this.defaultTypeMappingStyleKey;
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
