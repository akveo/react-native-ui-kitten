export const RkCardTypes = (theme) => {
  return ({
    _base: {
      container: {
        margin: 5,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: theme.colors.border.default
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        padding: 8,
      },
      content: {
        padding: 8,
        backgroundColor: theme.colors.background.screen,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
      },
      title: {
        fontSize: 24,
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row'
      },
      rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      subTitle: {
        fontSize: 14,
        color: theme.colors.text.subtitle
      },
      img: {
        flex: 1,
        height: 150,
        width: null,
      },
      avatar: {
        height: 64,
        width: 64,
        borderRadius: 32,
        marginRight: 10
      },
      avatarSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
      },
      bigImg: {
        flex: 1,
        height: 300,
        width: null,
      },
    }

  });
};


// export const CardStyles = {
//
//   rkCardText: {},
//   material: {
//     container: {
//       borderRadius: 2,
//       shadowColor: RkColors.grey500,
//       shadowOpacity: 0.5,
//       shadowRadius: 3,
//       shadowOffset: {
//         height: 1,
//         width: 0
//       }
//     },
//     header: {
//       borderTopLeftRadius: 2,
//       borderTopRightRadius: 2,
//       backgroundColor: RkColors.white,
//     },
//     footer: {
//       borderBottomLeftRadius: 2,
//       borderBottomRightRadius: 2,
//       backgroundColor: RkColors.white,
//     },
//     rkCardText: {
//       lineHeight: 22,
//       fontSize: 16
//     }
//   },
//   bordered: {
//     container: {
//       borderWidth: 1,
//       borderColor: RkColors.grey300
//     },
//     content: {
//       borderTopWidth: 0.5,
//       borderTopColor: RkColors.grey300
//     },
//     header: {
//       borderBottomWidth: 0.5,
//       borderBottomColor: RkColors.grey300
//     },
//     footer: {
//       borderTopWidth: 0.5,
//       borderTopColor: RkColors.grey300
//     }
//   },
//   noPadding: {
//     container: {
//       paddingLeft: 0,
//       paddingRight: 0,
//       paddingTop: 0,
//       paddingBottom: 0,
//     },
//     header: {
//       paddingLeft: 0,
//       paddingRight: 0,
//       paddingTop: 0,
//       paddingBottom: 0,
//     },
//     content: {
//       paddingLeft: 0,
//       paddingRight: 0,
//       paddingTop: 0,
//       paddingBottom: 0,
//     },
//     footer: {
//       paddingLeft: 0,
//       paddingRight: 0,
//       paddingTop: 0,
//       paddingBottom: 0,
//     },
//   }
// };