export const RkPickerTypes = (theme) => {
  return ({
    _base:{
      modalContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colors.screen.modalBackground,
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
        borderColor: theme.colors.border.solid,
        borderTopWidth: 1,
        marginTop: 20,
      },
      listsContainerStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      },
      cancelButtonStyle: {
        flex: 0.5,
        borderColor: theme.colors.border.solid,
        borderRightWidth: 0.5,
      },
      okButtonStyle: {
        flex: 0.5,
        borderColor: theme.colors.border.solid,
        borderLeftWidth: 0.5,
      },
      modalElementStyle: {
        marginVertical: 10,
        marginHorizontal: 10,
      },
      highlightConstStyle: {
        position: 'absolute',
        borderTopColor: theme.colors.border.solid,
        borderBottomColor: theme.colors.border.solid,
        width: 30,
        borderTopWidth: 2,
        borderBottomWidth: 2,
      }
    },
    basic: {
      borderRadius: 7,
      borderWidth: 0.5,
      borderColor: theme.colors.border.solid,
    },
    bordered: {
      borderRadius: 1,
      borderWidth: 0.5,
      borderColor: theme.colors.border.solid,
    },
    rounded: {
      borderRadius: 15,
      borderWidth: 0.5,
      borderColor: theme.colors.border.solid,
    }
  });
};