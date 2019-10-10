import React from 'react';
import { Toggle } from 'react-native-ui-kitten';
import {
  StyleSheet,
  View,
} from 'react-native';

export class ToggleInlineStylingShowcase extends React.Component {

  state = {
    checked: false,
  };

  onToggleValueChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <View style={styles.item}>
        <Toggle
          checked={this.state.checked}
          style={styles.item}
          text='This is a Toggle'
          textStyle={styles.text}
          onChange={this.onToggleValueChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    marginBottom: 16,
  },
  text: {
    color: 'red',
    fontSize: 20,
  },
});
