import React from 'react';
import { Toggle } from 'react-native-ui-kitten';
import {
  StyleSheet,
  View,
} from 'react-native';

export class ToggleSizeShowcase extends React.Component {

  state = {
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
  };

  onChecked1Change = (checked1) => {
    this.setState({ checked1 });
  };

  onChecked2Change = (checked2) => {
    this.setState({ checked2 });
  };

  onChecked3Change = (checked3) => {
    this.setState({ checked3 });
  };

  onChecked4Change = (checked4) => {
    this.setState({ checked4 });
  };

  onChecked5Change = (checked5) => {
    this.setState({ checked5 });
  };

  render() {
    const {
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
    } = this.state;

    return (
      <View style={styles.item}>
        <Toggle
          checked={checked1}
          size='tiny'
          style={styles.item}
          onChange={this.onChecked1Change}
        />
        <Toggle
          checked={checked2}
          size='small'
          style={styles.item}
          onChange={this.onChecked2Change}
        />
        <Toggle
          checked={checked3}
          style={styles.item}
          onChange={this.onChecked3Change}
        />
        <Toggle
          checked={checked4}
          size='large'
          style={styles.item}
          onChange={this.onChecked4Change}
        />
        <Toggle
          checked={checked5}
          size='giant'
          style={styles.item}
          onChange={this.onChecked5Change}
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
