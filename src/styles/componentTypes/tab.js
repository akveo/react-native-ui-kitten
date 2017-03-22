import {RkColors} from '../color.js';

export const TabTypes = (theme) => {
  return ( {
    _base: {
      container: {
        flex: 1,
        padding: 10,
        borderWidth: 0.5,
        backgroundColor: RkColors.white,
        borderColor: RkColors.blue500
      },
      inner: {
        textAlign: 'center',
        fontSize: 18,
        color: RkColors.blue500
      }
    },
    basic: {
      backgroundColor: RkColors.white,
      color: RkColors.blue500
    },
    selected: {
      backgroundColor: RkColors.blue500,
      color: RkColors.white
    }

  });
};

// material: {
//     container: {
//         backgroundColor: RkColors.grey300,
//         padding: 10,
//         borderTopWidth: 0,
//         borderLeftWidth: 0,
//         borderRightWidth: 0,
//         borderBottomWidth: 0.5,
//         borderBottomColor: RkColors.grey500
//     },
//     inner: {
//         textAlign: 'center',
//         fontSize: 18,
//         color: RkColors.darkGray
//     },
//     containerSelected: {
//         backgroundColor: RkColors.grey300,
//         borderBottomWidth: 3,
//         paddingBottom: 7.5,
//         borderBottomColor: RkColors.blue500
//     },
//     innerSelected: {
//         color: RkColors.blue500
//     }
// }
