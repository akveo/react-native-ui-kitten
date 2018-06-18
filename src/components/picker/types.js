import { StyleSheet } from 'react-native';

export const RkPickerTypes = (theme) => ({
  _base: {
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
      borderRadius: 7,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border.solid,
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
      marginTop: 20,
    },
    cancelButtonBlock: {
      flex: 0.5,
      borderColor: theme.colors.border.solid,
      borderRightWidth: 0.5,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    confirmButtonBlock: {
      flex: 0.5,
      borderColor: theme.colors.border.solid,
      borderLeftWidth: 0.5,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    highlightBlock: {
      position: 'absolute',
      borderTopColor: theme.colors.border.solid,
      borderBottomColor: theme.colors.border.solid,
      borderTopWidth: 1,
      borderBottomWidth: 1,
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
});
