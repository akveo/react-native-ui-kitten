export const RkChoiceGroupTypes = (theme) => ({
  _base: {
    container: {
      alignSelf: 'flex-start',
    },
  },
  bordered: {
    container: {
      borderWidth: 1,
      borderColor: theme.colors.border.solid,
      borderRadius: 4,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 11,
    },
  },
  stretch: {
    container: {
      alignSelf: 'stretch',
    },
  },
});
