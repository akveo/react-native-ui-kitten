import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Interaction, useStyled } from '@ui-kitten/components';

const StyledComponent: React.FC = () => {
  const { style, dispatch } = useStyled('StyledComponent', {});

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
//       "variantGroups": {},
//       "states": {
//         "active": {
//           "default": false,
//           "priority": 0
//         }
//       }
//     },
//     "appearances": {
//       "default": {
//         "mapping": {
//           "width": 32,
//           "height": 32,
//           "backgroundColor": "color-primary-default",
//           "state": {
//             "active": {
//               "backgroundColor": "color-primary-active"
//             }
//           }
//         }
//       }
//     }
//   }
// };

export const StyledComponentStatesShowcase = StyledComponent;
