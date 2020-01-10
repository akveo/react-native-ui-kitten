import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  ApplicationProvider,
  styled,
} from '@ui-kitten/components';
import {
  light,
  mapping,
} from '@eva-design/eva';

/**
 * All UI Kitten components are based on `styled` component.
 *
 * An example below demonstrates the how parameters can be transformed to component styles.
 * With next examples we'll see more complex examples.
 */

export const StyledComponentSimpleUsageShowcase = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={light}
    customMapping={{ components: { StyledComponent: styledComponentMapping } }}>

    <StyledComponentShowcase/>

  </ApplicationProvider>
);

class StyledComponent extends React.Component {

  static styledComponentName = 'StyledComponent';

  render() {
    return (
      <TouchableOpacity style={this.props.themedStyle}/>
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
    states: {},
  },
  appearances: {
    default: {
      mapping: {
        width: 32,
        height: 32,
        backgroundColor: 'color-primary-default',
      },
    },
  },
};
