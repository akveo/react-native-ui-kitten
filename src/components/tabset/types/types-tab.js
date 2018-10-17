export const RkTabTypes = (theme) => ({
  _base: {
    container: {
      base: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      selected: {},
    },
    title: {
      base: {
        color: theme.colors.overlay,
      },
      selected: {
        color: theme.colors.foreground,
      },
    },
    icon: {
      base: {
        marginHorizontal: 8,
        tintColor: theme.colors.overlay,
      },
      selected: {
        tintColor: theme.colors.foreground,
      },
    },
  },
});
