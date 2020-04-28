import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Interaction, styled } from '@ui-kitten/components';

@styled('StyledComponent')
class StyledComponent extends React.Component {

  onPressIn = () => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
  };

  onPressOut = () => {
    this.props.eva.dispatch([]);
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={this.props.eva.style}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      />
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
