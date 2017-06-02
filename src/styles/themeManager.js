import _ from 'lodash';
import EventEmitter from 'wolfy87-eventemitter'
import {DefaultTheme} from './defaultTheme';
import {RkColors} from './color';
import {TypeManager} from './typeManager';
import {RkStyleSheet} from './styleSheet'

const themeUpdated = 'themeUpdated';

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
    RkStyleSheet._invalidate();
    this.emitter.emitEvent(themeUpdated);
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