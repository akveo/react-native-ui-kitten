import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { CheckBox } from 'react-native-ui-kitten';

export class CheckboxTextShowcase extends React.Component {

  state = {
    checked: false,
  };

  onCheckedChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          checked={this.state.checked}
          text='This is Checkbox Component'
          onChange={this.onCheckedChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
