import {RkTheme} from 'react-native-ui-kitten'

export const BlueTheme = {
  colors: {
    text: {
      additional: 'white',
    },
    background: {
      screen: RkTheme.colors.lightBlue900,
      secondary: RkTheme.colors.red100,
      default: RkTheme.colors.blue100,
      primary: RkTheme.colors.blue400,
      success: RkTheme.colors.lime500,
      info: RkTheme.colors.lightBlue400,
      warning: RkTheme.colors.yellow800,
      danger: RkTheme.colors.pink600,
      outline: 'transparent'
    },
  }

};

export const RedTheme = {
  colors: {
    text: {
      additional: 'white',
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