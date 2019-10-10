import React from 'react';
import { Toggle } from 'react-native-ui-kitten';
import {
  StyleSheet,
  View,
} from 'react-native';

export class ToggleSimpleUsageShowcase extends React.Component {

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
          onChange={this.onToggleValueChange}
        />
        <Toggle
          checked={false}
          disabled
          style={styles.item}
        />
        <Toggle
          checked={true}
          disabled
          style={styles.item}
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
});
