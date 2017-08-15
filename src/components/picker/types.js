export const RkPickerTypes = (theme) => {
  return ({
    _base:{
      modalContainerBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colors.screen.modalBackground,
      },
      modalContentBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginHorizontal: 32,
        backgroundColor: theme.colors.screen.base,
      },
      titleBlock: {
        marginVertical: 10,
        marginHorizontal: 10,
      },
      listsContainerBlock: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
      },
      buttonsBlockBlock: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: theme.colors.border.solid,
        borderTopWidth: 1,
        marginTop: 20,
      },
      cancelButtonBlock: {
        flex: 0.5,
        borderColor: theme.colors.border.solid,
        borderRightWidth: 0.5,
        borderTopWidth: 1,
      },
      confirmButtonBlock: {
        flex: 0.5,
        borderColor: theme.colors.border.solid,
        borderLeftWidth: 0.5,
        borderTopWidth: 1,
      },
      highlightBlock: {
        position: 'absolute',
        borderTopColor: theme.colors.border.solid,
        borderBottomColor: theme.colors.border.solid,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        left: 0,
        right: 0,
      },
      optionBlock: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      optionListContainer: {
        flex: 1,
        marginHorizontal: 20,
      },
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