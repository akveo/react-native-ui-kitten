import {RkColors} from '../color.js';

export const TabTypes = (theme) => {
  return ( {
    _base: {
      container: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.primary
      },
      inner: {
        margin:15,
        textAlign: 'center',
        color: theme.colors.primary,
      }
    },
    basic: {
      backgroundColor: theme.colors.back.base,
      color: theme.colors.primary
    },
    selected: {
      backgroundColor: '#ececec',
    },
    material: {
      backgroundColor: theme.colors.back.material,
      color: 'white',
      inner: {
        opacity: 0.7,
      },
      container:{
        padding:15,
        borderWidth: 0,
        borderBottomColor: theme.colors.back.material,
        borderBottomWidth: 2
      }
    },
    materialSelected: {
      color: 'white',
      inner: {
        opacity: 1
      },
      container: {
        padding:15,
        borderWidth: 0,
        borderBottomColor: theme.colors.border.material,
        borderBottomWidth: 2
      }
    }
  });
};