export const RkChoiceTypes = (theme) => ({
  _base: {
    container: {
      borderWidth: 1,
      borderColor: theme.colors.border.base,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    inner: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      imageSource: () => require('../../assets/img/choice/empty.png'),
      margin: 4,
    },
  },
  Selected: {
    backgroundColor: theme.colors.screen.primary,
    borderColor: theme.colors.border.base,
    inner: {
      imageSource: () => require('../../assets/img/choice/checkMark.png'),
      tintColor: 'white',
    },
  },
  Disabled: {
    borderColor: theme.colors.border.disabled,
    inner: {
      tintColor: theme.colors.border.disabled,
    },
  },
  SelectedDisabled: {
    borderColor: theme.colors.border.disabled,
    backgroundColor: theme.colors.screen.disabled,
    inner: {
      imageSource: () => require('../../assets/img/choice/checkMark.png'),
      tintColor: theme.colors.border.disabled,
    },
  },

  radio: {
    borderRadius: 15,
  },
  radioSelected: {
    borderRadius: 15,
    backgroundColor: 'transparent',
    inner: {
      imageSource: () => require('../../assets/img/choice/circle.png'),
      tintColor: theme.colors.screen.primary,
    },
  },
  radioDisabled: {
    borderRadius: 15,
  },
  radioSelectedDisabled: {
    borderRadius: 15,
    backgroundColor: 'transparent',
    inner: {
      imageSource: () => require('../../assets/img/choice/circle.png'),
    },
  },

  posNeg: {
    borderWidth: 0,
    inner: {
      imageSource: () => require('../../assets/img/choice/crossMark.png'),
      tintColor: '#ed1c4d',
    },
  },
  posNegSelected: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    inner: {
      tintColor: '#22c93d',
    },
  },
  posNegDisabled: {
    borderWidth: 0,
    inner: {
      imageSource: () => require('../../assets/img/choice/crossMark.png'),
    },
  },
  posNegSelectedDisabled: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },

  clear: {
    borderWidth: 0,
  },
  clearSelected: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    inner: {
      tintColor: '#22c93d',
    },
  },
  clearDisabled: {
    borderWidth: 0,
  },
  clearSelectedDisabled: {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
});
