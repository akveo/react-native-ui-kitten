import _ from 'lodash';
import EventEmitter from 'wolfy87-eventemitter'
import {DefaultTheme} from './defaultTheme';
import {RkColors} from './color';
import {TypeManager} from './typeManager';
import {RkStyleSheet} from './styleSheet'

const themeUpdated = 'themeUpdated';
/**
 * `RkTheme` object is entry point for all manipulations with customization.
 */
class ThemeManager {

  constructor() {
    this._currentTheme = this._getDefault();
    this._colors = _.cloneDeep(RkColors);
    this._updatePredefinedStyles();
    this.emitter = new EventEmitter();
  }

  _subscribe(listener) {
    this.emitter.addListener(themeUpdated, listener);
  }

  _unSubscribe(listener) {
    this.emitter.removeListener(themeUpdated, listener);
  }

  _updatePredefinedStyles() {
    this._predefinedStyles = this._createColorsStyles(this._colors);
  }

  _createColorsStyles(colors) {
    let styleObject = {};
    for (let colorName in colors) {
      styleObject[colorName + 'Text'] = {
        color: colors[colorName]
      };
      styleObject[colorName + 'Bg'] = {
        backgroundColor: colors[colorName]
      };
      styleObject[colorName + 'Border'] = {
        borderColor: colors[colorName]
      };
    }
    return styleObject;
  }

  _getDefault() {
    return _.cloneDeep(DefaultTheme);
  }

  /**
   * {object} Returns current theme object.
   */
  get current() {
    return this._currentTheme;
  }

  /**
   * {object} Returns auto styles. Deprecated.
   */
  get styles() {
    return this._predefinedStyles;
  }

  /**
   * {object} Returns object contains material colors.
   */
  get colors() {
    return this._colors;
  }

  /**
   * Updates current theme with new one. Note: function will always merge new theme with current.
   * @param {object} theme - new theme.
   */
  setTheme(theme) {
    let baseTheme = this._getDefault();

    let newTheme = _.merge(baseTheme, theme);
    _.merge(this._currentTheme, newTheme);

    TypeManager.invalidateTypes();
    RkStyleSheet._invalidate();
    this.emitter.emitEvent(themeUpdated);
  }

  /**
   * Creates new rkType for passed component.
   * @param {string} element - component name for which new rkType should applied.
   * @param {string} name - name of new rkType
   * @param {object} value - style object for new rkType
   */
  setType(element, name, value) {
    TypeManager.setType(element, name, value);
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
    this._colors[name] = value;
    this._updatePredefinedStyles();
  }
}


export let RkTheme = new ThemeManager();