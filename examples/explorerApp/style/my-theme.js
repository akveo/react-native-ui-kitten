import {RkTheme} from 'react-native-ui-kitten'

export const BlueTheme = {
  colors: {
    text: {
      additional: 'white',
      base:'red'
    },
    back: {
      base: 'green',
      secondary: RkTheme.colors.red100,
      default: RkTheme.colors.blue100,
      primary: RkTheme.colors.red700,
      success: RkTheme.colors.lime500,
      info: RkTheme.colors.red600,
      warning: RkTheme.colors.yellow800,
      danger: RkTheme.colors.pink600,
      outline: 'transparent'
    },
  }

};

export const RedTheme = {
  colors: {
    text: {
      back: 'white',
    },
    background: {
      screen: RkTheme.colors.deepOrange100,
      default: RkTheme.colors.red400,
      primary: RkTheme.colors.lightBlue900,
      success: RkTheme.colors.lightGreen500,
      info: RkTheme.colors.lightBlue600,
      warning: RkTheme.colors.red600,
      danger: RkTheme.colors.red800,
      outline: 'transparent'
    },
  },
  fonts: {
    sizes: {
      medium: 10
    }
  },

};