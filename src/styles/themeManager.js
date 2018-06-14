import _ from 'lodash';
import { DefaultTheme } from './defaultTheme';
import { RkColors } from './color';
import { TypeManager } from './typeManager';
import { RkStyleSheet } from './styleSheet';

/**
 * `RkTheme` object is entry point for all manipulations with customization.
 */
class ThemeManager {
  constructor() {
    this.currentTheme = this.getDefault();
    this.themeColors = _.cloneDeep(RkColors);
    this.updatePredefinedStyles();
    this.listeners = [];
  }

  subscribeComponent(obj) {
    this.listeners.push(obj);
  }

  unsubscribeComponent(obj) {
    _.pull(this.listeners, obj);
  }

  updatePredefinedStyles() {
    this.predefinedStyles = this.createColorsStyles(this.colors);
  }

  createColorsStyles(colors) {
    const styleObject = {};
    Object.keys(colors).forEach(key => {
      styleObject[`${key}Text`] = {
        color: colors[key],
      };
      styleObject[`${key}Bg`] = {
        backgroundColor: colors[key],
      };
      styleObject[`${key}Border`] = {
        borderColor: colors[key],
      };
    });
    return styleObject;
  }

  getDefault() {
    return _.cloneDeep(DefaultTheme);
  }

  /**
   * {object} Returns current theme object.
   */
  get current() {
    return this.currentTheme;
  }

  /**
   * {object} Returns auto styles. Deprecated.
   */
  get styles() {
    return this.predefinedStyles;
  }

  /**
   * {object} Returns object contains material colors.
   */
  get colors() {
    return this.themeColors;
  }

  /**
   * Updates current theme with new one. Note: function will always merge new theme with current.
   * @param {object} theme - new theme.
   */
  setTheme(theme) {
    const baseTheme = this.getDefault();

    const newTheme = _.merge(baseTheme, theme);
    _.merge(this.currentTheme, newTheme);

    TypeManager.invalidateTypes();
    RkStyleSheet.invalidate();

    this.listeners.forEach(t => t.forceUpdate());
  }

  /**
   * Creates new rkType for passed component.
   * @param {string} element - component name for which new rkType should applied.
   * @param {string} name - name of new rkType
   * @param {object} value - style object for new rkType
   */
  setType(element, name, value, parentTypes) {
    TypeManager.setType(element, name, value, parentTypes);
  }

  /**
   * Register component in theming system in order to predefine rkTypes.
   * @param {string} element - element name which will be registered.
   * @param {func} types - function which takes theme and returns object with themed rkTypes
   */
  registerComponent(element, types) {
    TypeManager.registerTypes(element, types);
  }

  /**
   * Add new color to theme
   * @param {string} name - name of new color
   * @param {string} value - color value.
   */
  setColor(name, value) {
    this.colors[name] = value;
    this.updatePredefinedStyles();
  }
}

export const RkTheme = new ThemeManager();
