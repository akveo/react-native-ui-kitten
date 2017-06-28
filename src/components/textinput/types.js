export const RkTextInputTypes = (theme) => {
  return ({
    _base: {
      input: {
        flex: 1,
        fontSize: theme.fonts.sizes.base,
        height: {
          ios: theme.fonts.sizes.base * 1.42,
          android: undefined
        },
        alignSelf: 'center',
        marginVertical: {
          ios: 18,
          android: 4
        },
        marginLeft: 16
      },
      container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.border.base,
        marginVertical: 9
      },
      label: {
        fontSize: theme.fonts.sizes.base,
        alignSelf: 'center',
      }
    },
    basic: {
      backgroundColor: 'transparent',
      inputBackgroundColor: 'transparent',
      color: theme.colors.input.text,
      labelColor: theme.colors.input.label,
      placeholderTextColor: theme.colors.input.placeholder
    },

    bordered: {
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: theme.colors.border.solid,
      underlineColor: theme.colors.border.solid,
    },

    rounded: {
      borderRadius: 100,
      borderWidth: 0.5,
      borderColor: theme.colors.border.solid,
      underlineColor: theme.colors.border.solid,
    },

    form: {
      input: {
        flex: -1,
        width: 240,
        borderColor: theme.colors.border.solid,
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        marginVertical: 0,
        paddingLeft: 14,
        marginLeft: 13
      },
      label: {
        flexDirection: 'column',
        alignSelf: 'center',
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
      },
      underlineWidth: 0
    },
    clear: {
      underlineWidth: 0
    },
    topLabel: {
      input: {
        alignSelf: 'stretch',
        marginVertical: {
          android: 2,
          ios: 14
        }
      },
      container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      label: {
        fontSize: theme.fonts.sizes.small,
        alignSelf: 'flex-start'
      }
    },
  });
};