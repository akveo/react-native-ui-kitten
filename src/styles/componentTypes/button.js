export const RkButtonTypes = (theme) => {
  return ({
    _base: {
      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
      },
      inner: {
        fontSize: theme.fonts.sizes.default,
        alignSelf: 'center',
        textAlign: 'center',
      },
    },

    //made a copy from previous version
    //seems like it works not how i would expect
    _defaultShadow: {
      shadowColor: theme.colors.shadow.default,
      shadowOpacity: 0.5,
      shadowRadius: 3,
      shadowOffset: {
        height: 1,
        width: 0
      }
    },
    basic: {
      backgroundColor: theme.colors.background.default,
      color: theme.colors.text.default
    },
    primary: {
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.additional
    },
    warning: {
      backgroundColor: theme.colors.background.warning,
      color: 'black'
    },
    danger: {
      backgroundColor: theme.colors.background.danger,
      color: theme.colors.text.additional
    },
    success: {
      backgroundColor: theme.colors.background.success,
      color: theme.colors.text.additional
    },
    info: {
      backgroundColor: theme.colors.background.info,
      color: theme.colors.text.additional
    },
    outline: {
      borderColor: theme.colors.border.default,
      borderWidth: 1,
      backgroundColor: theme.colors.background.outline
    },
    circle: {
      borderRadius: 100
    },
    small: {
      paddingVertical: 4,
      paddingHorizontal: 7,
      fontSize: theme.fonts.sizes.small
    },
    medium: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: theme.fonts.sizes.medium
    },
    large: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: theme.fonts.sizes.large
    },
    shadow: {
      hasShadow: true,
      shadowColor: theme.colors.shadow.default
    },
    clear:{
      backgroundColor:'transparent'
    }
  })
};
