export const RkSwitchTypes = (theme) => {
  return ({
    _base: {
      component: {
        onTintColor: {
          ios: undefined,
          android: '#4cd964'
        },
        thumbTintColor: {
          ios: undefined,
          android: 'white'
        },
        tintColor: {
          ios: undefined,
          android: '#e5e5e5'
        }
      }
    },
    primary: {
      onTintColor: theme.colors.button.primary,
    },
    warning: {
      onTintColor: theme.colors.button.warning,
    },
    danger: {
      onTintColor: theme.colors.button.danger,
    },
    success: {
      onTintColor: theme.colors.button.success,
    },
    info: {
      onTintColor: theme.colors.button.info,
    }
  })
};