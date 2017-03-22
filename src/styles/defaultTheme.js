import {RkColors} from './color'
let primary = RkColors.cyan800;
let accent = '#B2FF59';
let success = RkColors.green600;
let warning = RkColors.amber700;
let danger = RkColors.red800;
let info = RkColors.lightBlue300;

export const DefaultTheme = {
  colors: {
    main: {
      primary: primary,
      secondary: RkColors.lightGreen400,
      accent: accent,
      default: RkColors.lightGreen500,
      success: success,
      info: info,
      warning: warning,
      danger: danger
    },
    text: {
      default: RkColors.lightGreen900,
      additional: RkColors.white,
      subtitle: RkColors.lightGreen700
    },
    background: {
      screen: RkColors.lightGreen50,
      secondary: RkColors.lightGreen100,
      default: RkColors.lightGreen300,
      primary: primary,
      success: success,
      info: info,
      warning: warning,
      danger: danger,
      outline: RkColors.transparent
    },
    border: {
      default: RkColors.lightGreen700
    },
    shadow: {
      default: RkColors.lightGreen400
    }
  },
  fonts: {
    sizes: {
      default: 18,
      small: 14,
      medium: 16,
      large: 20
    }
  }
};