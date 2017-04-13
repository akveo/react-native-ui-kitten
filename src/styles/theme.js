import {DefaultTheme} from './defaultTheme.js';
import {RkColors} from './color.js';
import {TypeManager} from './typeManager.js';
import _ from 'lodash';

class ThemeManager {

  constructor() {
    this._currentTheme = this._getDefault();
    this._colors = _.cloneDeep(RkColors);
    this._updatePredefinedStyles();
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

  get current() {
    return this._currentTheme;
  }

  get styles() {
    return this._predefinedStyles;
  }

  get colors() {
    return this._colors;
  }

  setTheme(theme, baseTheme) {
    if (baseTheme === undefined) {
      baseTheme = this._getDefault();
    }

    let newTheme = _.merge(baseTheme, theme);
    _.merge(this._currentTheme, newTheme);
    TypeManager.invalidateTypes();
  }

  setType(element, name, value) {
    TypeManager.setType(element, name, value);
  }

  registerComponent(element, types) {
    TypeManager.registerTypes(element, types);
  }

  setColor(name, value) {
    this._colors[name] = value;
    this._updatePredefinedStyles();
  }
}


export let RkTheme = new ThemeManager();