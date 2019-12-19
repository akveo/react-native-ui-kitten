import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  ApplicationProvider,
  Interaction,
  styled,
} from '@ui-kitten/components';
import {
  light,
  mapping,
} from '@eva-design/eva';

/**
 * This example shows how styled component can apply custom properties like status or size.
 * Note that it is controlled by passing them outside, via props, but it is defined in mappings.
 *
 * Let's say we want to have a `status` property that can be `primary` (which is default) and `danger`.
 * Furthermore, we still want to control backgroundColor when it is pressed.
 *
 * The `variantGroups` key in `meta` defines all custom properties that can be applied by component.
 * Each key in variant group is a string value that can be passed to this prop.
 *
 * Note that we can move `backgroundColor` property from `mapping` to each status.
 */

export const StyledComponentVariantsShowcase = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={light}
    customMapping={{ components: { StyledComponent: styledComponentMapping } }}>

    <StyledComponentShowcase status='danger'/>

  </ApplicationProvider>
);

class StyledComponent extends React.Component {

  static styledComponentName = 'StyledComponent';

  onPressIn = () => {
    this.props.dispatch([Interaction.ACTIVE]);
  };

  onPressOut = () => {
    this.props.dispatch([]);
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={this.props.themedStyle}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      />
    );
  }
}

const StyledComponentShowcase = styled(StyledComponent);

const styledComponentMapping = {
  meta: {
    parameters: {
      width: {
        type: 'number',
      },
      height: {
        type: 'number',
      },
      backgroundColor: {
        type: 'string',
      },
    },
    appearances: {
      default: {
        default: true,
      },
    },
    variantGroups: {
      status: {
        primary: {
          default: true,
        },
        danger: {
          default: false,
        },
      },
    },
    states: {
      active: {
        default: false,
        priority: 0,
      },
    },
  },
  appearances: {
    default: {
      mapping: {
        width: 40,
        height: 40,
      },
      variantGroups: {
        status: {
          primary: {
            backgroundColor: 'color-primary-default',
            state: {
              active: {
                backgroundColor: 'color-primary-active',
              },
            },
          },
          danger: {
            backgroundColor: 'color-danger-default',
            state: {
              active: {
                backgroundColor: 'color-danger-active',
              },
            },
          },
        },
      },
    },
  },
};
