import React from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  View,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
  Interaction,
} from '@kitten/theme';

interface ToggleComponentProps {
  checked?: boolean;
  onChange?: (selected: boolean) => void;
  appearance?: string | 'default';
  status?: string | 'error';
  size?: string | 'big' | 'small';
}

export type ToggleProps = ToggleComponentProps & StyledComponentProps & TouchableOpacityProps;

interface State {
  toggled: boolean;
}

export class Toggle extends React.Component<ToggleProps, State> {

  state: State = {
    toggled: false,
  };

  render() {
    console.log(this.props.themedStyle)

    return (
      <View style={styles.container}>
        <Text>This is toggle</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
  },
});
