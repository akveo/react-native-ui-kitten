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
        overflow: 'hidden',
        width: 128,
        height: 44,
      },
      content: {
        fontSize: theme.fonts.sizes.base,
        alignSelf: 'center',
        textAlign: 'center',
      }
    },
    basic: {
      backgroundColor: theme.colors.back.primary,
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
      fontSize: theme.fonts.sizes.small,
      height: 36,
      width: 80,
      container: {
        paddingVertical: 4,
        paddingHorizontal: 6,
      }
    },
    medium: {
      container: {
        paddingVertical: 8,
        paddingHorizontal: 12,
      },
      fontSize: theme.fonts.sizes.medium,
    },
    large: {
      fontSize: theme.fonts.sizes.large,
      height: 52,
      width: 180,
      container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
      }
    },
    xlarge: {
      fontSize: theme.fonts.sizes.xlarge,
      height: 60,
      width: -1,
      container: {
        alignSelf: 'stretch',
        paddingVertical: 15,
        paddingHorizontal: 20,
      }
    },
    clear: {
      backgroundColor: 'transparent',
      width: null,
      height: null,
      container: {
        paddingVertical: 0,
        paddingHorizontal: 0,
      }
    },
    stretch: {
      container: {
        alignSelf: 'stretch',
      },
      width: null
    }
  })
};
