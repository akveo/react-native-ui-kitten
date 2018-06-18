export const RkButtonTypes = (theme) => ({
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
    },
  },
  basic: {
    backgroundColor: theme.colors.button.primary,
    color: theme.colors.button.text,
  },
  transparent: {
    backgroundColor: theme.colors.button.outline,
  },
  primary: {
    backgroundColor: theme.colors.button.primary,
    color: theme.colors.button.text,
  },
  warning: {
    backgroundColor: theme.colors.button.warning,
    color: theme.colors.button.text,
  },
  danger: {
    backgroundColor: theme.colors.button.danger,
    color: theme.colors.button.text,
  },
  success: {
    backgroundColor: theme.colors.button.success,
    color: theme.colors.button.text,
  },
  info: {
    backgroundColor: theme.colors.button.info,
    color: theme.colors.button.text,
  },
  outline: {
    borderColor: theme.colors.button.primary,
    borderWidth: 1,
    color: theme.colors.button.primary,
    backgroundColor: theme.colors.button.outline,
  },
  rounded: {
    borderRadius: 22,
  },
  circle: {
    borderRadius: 300,
  },
  rectangle: {
    borderRadius: 0,
  },
  small: {
    fontSize: theme.fonts.sizes.small,
    height: 36,
    width: 80,
    container: {
      paddingVertical: 4,
      paddingHorizontal: 6,
    },
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
    },
  },
  xlarge: {
    fontSize: theme.fonts.sizes.xlarge,
    height: 60,
    width: -1,
    container: {
      alignSelf: 'stretch',
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
  },
  clear: {
    backgroundColor: 'transparent',
    width: null,
    height: null,
    container: {
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
  },
  stretch: {
    container: {
      alignSelf: 'stretch',
    },
    width: null,
  },
});
