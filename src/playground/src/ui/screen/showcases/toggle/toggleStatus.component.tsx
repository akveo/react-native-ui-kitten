import React from 'react';
import { Toggle } from 'react-native-ui-kitten';
import {
  StyleSheet,
  View,
} from 'react-native';

export class ToggleStatusShowcase extends React.Component {

  state = {
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
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

  onChecked6Change = (checked6) => {
    this.setState({ checked6 });
  };

  render() {
    const {
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
    } = this.state;

    return (
      <View style={styles.item}>
        <Toggle
          checked={checked1}
          status='primary'
          style={styles.item}
          onChange={this.onChecked1Change}
        />
        <Toggle
          checked={checked2}
          status='success'
          style={styles.item}
          onChange={this.onChecked2Change}
        />
        <Toggle
          checked={checked3}
          status='info'
          style={styles.item}
          onChange={this.onChecked3Change}
        />
        <Toggle
          checked={checked4}
          status='danger'
          style={styles.item}
          onChange={this.onChecked4Change}
        />
        <Toggle
          checked={checked5}
          status='warning'
          style={styles.item}
          onChange={this.onChecked5Change}
        />
        <Toggle
          checked={checked6}
          style={styles.item}
          onChange={this.onChecked6Change}
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
