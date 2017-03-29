export const RkButtonTypes = (theme) => {
  return ({
    _base: {
      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
        overflow: 'hidden',
        width: 128,
        height: 44,
      },
      inner: {
        fontSize: theme.fonts.sizes.base,
        alignSelf: 'center',
        textAlign: 'center',
      }
    },
    basic: {
      backgroundColor: theme.colors.back.button,
      color: theme.colors.text.additional
    },
    primary: {
      backgroundColor: theme.colors.back.primary,
      color: theme.colors.text.additional
    },
    warning: {
      backgroundColor: theme.colors.back.warning,
      color: theme.colors.text.additional
    },
    danger: {
      backgroundColor: theme.colors.back.danger,
      color: theme.colors.text.additional
    },
    success: {
      backgroundColor: theme.colors.back.success,
      color: theme.colors.text.additional
    },
    info: {
      backgroundColor: theme.colors.back.info,
      color: theme.colors.text.additional
    },
    outline: {
      borderColor: theme.colors.border.base,
      borderWidth: 1,
      color: theme.colors.border.base,
      backgroundColor: theme.colors.back.outline
    },
    rounded: {
      borderRadius: 22
    },
    circle: {
      borderRadius: 300
    },
    small: {
      paddingVertical: 4,
      paddingHorizontal: 6,
      fontSize: theme.fonts.sizes.small,
      container: {
        height: 36,
        width: 80,
      }
    },
    medium: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: theme.fonts.sizes.medium,
    },
    large: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: theme.fonts.sizes.large,
      container: {
        height: 52,
        width: 180,
      }
    },
    xlarge: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      fontSize: theme.fonts.sizes.xlarge,
      container: {
        height: 60,
        width: -1,
        alignSelf: 'stretch'
      }
    },
    clear: {
      backgroundColor: 'transparent',
      container: {
        width: null,
        height: null,
        paddingVertical: 0,
        paddingHorizontal: 0,
      }
    }
  })
};
