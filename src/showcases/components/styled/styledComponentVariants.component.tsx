import React from 'react';
import { TouchableOpacity } from 'react-native';
import { EvaProp, Interaction, styled } from '@ui-kitten/components';

interface Props {
  eva?: EvaProp;
}

@styled('StyledComponent')
class StyledComponent extends React.Component<Props> {

  onPressIn = (): void => {
    this.props.eva?.dispatch([Interaction.ACTIVE]);
  };

  onPressOut = (): void => {
    this.props.eva?.dispatch([]);
  };

  render(): React.ReactElement {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={this.props.eva?.style}
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
