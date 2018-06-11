export const TabTypes = (theme) => ({
  _base: {
    tabContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    content: {
      padding: 15,
      textAlign: 'center',
      color: theme.colors.primary,
      overflow: 'hidden',
    },
    contentContainer: {
      flex: 1,
    },
  },
  basic: {
    tabContainer: {
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
    },
    backgroundColor: theme.colors.screen.base,
    color: theme.colors.primary,
  },
  selected: {
    backgroundColor: theme.colors.highlight,
  },
  material: {
    backgroundColor: theme.colors.screen.material,
    color: theme.colors.text.inverse,
    content: {
      opacity: 0.7,
    },
    tabContainer: {
      padding: 15,
      borderWidth: 0,
      borderBottomColor: theme.colors.screen.material,
      borderBottomWidth: 2,
    },
  },
  materialSelected: {
    color: theme.colors.text.inverse,
    content: {
      opacity: 1,
    },
    tabContainer: {
      padding: 15,
      borderWidth: 0,
      borderBottomColor: theme.colors.border.material,
      borderBottomWidth: 2,
    },
  },
});
