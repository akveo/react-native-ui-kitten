import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled } from '@ui-kitten/components';

@styled('StyledComponent')
class StyledComponent extends React.Component {
  render() {
    return (
      <TouchableOpacity style={this.props.eva.style}/>
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
