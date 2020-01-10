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
 * This example shows how styled component can control states.
 *
 * Let's say we don't like the standard behavior of TouchableOpacity when it's pressed and
 * we want the component to change it's color rather being highlighted.
 *
 * We define an active state in `meta` key and in mapping, so that component will change `backgroundColor`,
 * when `active` is requested. To do this, we call `dispatch` function when Touchable is pressed.
 * Then, when touch is released, we request nothing, which stands for `default`.
 */

export const StyledComponentStatesShowcase = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={light}
    customMapping={{ components: { StyledComponent: styledComponentMapping } }}>

    <StyledComponentShowcase/>

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
    variantGroups: {},
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
        width: 32,
        height: 32,
        backgroundColor: 'color-primary-default',
        state: {
          active: {
            backgroundColor: 'color-primary-active',
          },
        },
      },
    },
  },
};
