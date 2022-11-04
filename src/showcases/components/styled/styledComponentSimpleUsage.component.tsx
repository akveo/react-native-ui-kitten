import React from 'react';
import { TouchableOpacity } from 'react-native';
import { EvaProp, styled } from '@ui-kitten/components';

interface IProps {
  eva: EvaProp;
}

@styled('StyledComponent')
class StyledComponent extends React.Component<IProps> {
  render(): React.ReactElement {
    return (
      <TouchableOpacity style={this.props.eva.style} />
    );
  }
}

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
