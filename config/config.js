import {Colors} from './color.js';
import {RkStyle} from './style.js';
import {Themes} from './themes.js'

export const RkConfig =  class {
  static colors = Colors;
  static themes = Themes;
  static theme = Themes.iosLike;
  static styles = RkStyle;
  static iconFamily = 'Ionicons';
  static setColor = (name, value) => RkConfig.colors[name] = value;
  static setStyle = (name, value) => RkConfig.styles[name] = value;
  static setType = (element, name, value) => {
    RkConfig.themes.styles[element][name] = value;
  };
  static setTheme = (themeName, value) => {
    RkConfig.themes[themeName] = value;
  };
};