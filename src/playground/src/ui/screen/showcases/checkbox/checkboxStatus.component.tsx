import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { CheckBox } from 'react-native-ui-kitten';

export class CheckboxStatusShowcase extends React.Component {

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
      <View style={styles.container}>
        <CheckBox
          style={styles.checkbox}
          status='primary'
          checked={checked1}
          onChange={this.onChecked1Change}
        />
        <CheckBox
          style={styles.checkbox}
          status='success'
          checked={checked2}
          onChange={this.onChecked2Change}
        />
        <CheckBox
          style={styles.checkbox}
          status='info'
          checked={checked3}
          onChange={this.onChecked3Change}
        />
        <CheckBox
          style={styles.checkbox}
          status='warning'
          checked={checked4}
          onChange={this.onChecked4Change}
        />
        <CheckBox
          style={styles.checkbox}
          status='danger'
          checked={checked5}
          onChange={this.onChecked5Change}
        />
        <CheckBox
          style={styles.checkbox}
          status='basic'
          checked={checked6}
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
  checkbox: {
    marginBottom: 16,
  },
});
