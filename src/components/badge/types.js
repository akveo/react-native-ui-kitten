export const RkBadgeTypes = (theme) => ({
  _base: {
    container: {
      padding: 2,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },
    title: {
      color: theme.colors.text.inverse,
      fontSize: theme.fonts.sizes.small,
      fontWeight: '700',
    },
  },
  primary: {
    container: {
      backgroundColor: theme.colors.primary,
    },
  },
  info: {
    container: {
      backgroundColor: theme.colors.info,
    },
  },
  success: {
    container: {
      backgroundColor: theme.colors.success,
    },
  },
  warning: {
    container: {
      backgroundColor: theme.colors.warning,
    },
  },
  danger: {
    container: {
      backgroundColor: theme.colors.danger,
    },
  },
});
