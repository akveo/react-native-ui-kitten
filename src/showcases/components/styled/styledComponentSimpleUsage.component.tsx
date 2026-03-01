import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useStyled } from '@ui-kitten/components';

const StyledComponent: React.FC = () => {
  const { style } = useStyled('StyledComponent', {});

  return (
    <TouchableOpacity style={style} />
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
//       "states": {}
//     },
//     "appearances": {
//       "default": {
//         "mapping": {
//           "width": 32,
//             "height": 32,
//             "backgroundColor": "color-primary-default"
//         }
//       }
//     }
//   }
// }

export const StyledComponentSimpleUsageShowcase = StyledComponent;
