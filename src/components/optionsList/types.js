export const RkOptionsListTypes = (theme) => {
  return ({
    _base: {
      optionStyle: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      selectedOptionStyle: {
        borderColor: theme.colors.border.solid,
        borderWidth: 2
      }
    },
    basic: {}
  });
};