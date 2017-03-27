export const RkTextTypes = (theme) => {
  return ({
    basic: {
      fontSize: theme.fonts.sizes.base,
      color: theme.colors.text.base,
    },
    header: {
      fontSize: theme.fonts.sizes.large,

    },
    primary: {
      color: theme.colors.primary
    },
    info: {
      color: theme.colors.info
    },
    success: {
      color: theme.colors.success
    },
    danger: {
      color: theme.colors.danger,
    },
    warning: {
      color: theme.colors.warning,
    }
  });
};