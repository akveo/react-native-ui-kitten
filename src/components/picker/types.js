export const RkPickerTypes = (theme) => {
  return ({
    _base:{
      modalContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colors.screen.foreground,
      },
      modalContentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginHorizontal: 32,
        backgroundColor: theme.colors.screen.base,
      },
      buttonsBlockStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
      listsContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      buttonStyle: {
        flex: 0.5,
      },
      modalElementStyle: {
        marginVertical: 10,
        marginHorizontal: 10,
      }
    },
    basic: {
      borderWidth: 0.5,
      borderColor: theme.colors.border.solid,
    },
    bordered: {
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: theme.colors.border.solid,
    },
    rounded: {
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: theme.colors.border.solid,
    }
  });
};