export const RkTabBarIndicatorTypes = (theme) => ({
  _base: {
    container: {
      height: 4,
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.success,
    },
  },
  rounded: {
    content: {
      borderRadius: 2,
    },
  },
});
