import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Interaction, useStyled } from '@ui-kitten/components';

interface Props {
  status?: string;
}

const StyledComponent: React.FC<Props> = ({ status }) => {
  const { style, dispatch } = useStyled('StyledComponent', { status });

  const onPressIn = (): void => {
    dispatch([Interaction.ACTIVE]);
  };

  const onPressOut = (): void => {
    dispatch([]);
  };

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={style}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    />
  );
};

// mapping.json
// {
//   "StyledComponent": {
//     "meta": {
//       "parameters": {
//         "width": {
//           "type": "number"
//         },
//         "height": {
//           "type": "number"
//         },
//         "backgroundColor": {
//           "type": "string"
//         }
//       },
//       "appearances": {
//         "default": {
//           "default": true
//         }
//       },
//       "variantGroups": {
//         "status": {
//           "primary": {
//             "default": true
//           },
//           "danger": {
//             "default": false
//           }
//         }
//       },
//       "states": {
//         "active": {
//           "default": false,
//             "priority": 0
//         }
//       }
//     },
//     "appearances": {
//       "default": {
//         "mapping": {
//           "width": 40,
//             "height": 40
//         },
//         "variantGroups": {
//           "status": {
//             "primary": {
//               "backgroundColor": "color-primary-default",
//                 "state": {
//                 "active": {
//                   "backgroundColor": "color-primary-active"
//                 }
//               }
//             },
//             "danger": {
//               "backgroundColor": "color-danger-default",
//                 "state": {
//                 "active": {
//                   "backgroundColor": "color-danger-active"
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

export const StyledComponentVariantsShowcase = (): React.ReactElement => (
  <StyledComponent />
);
