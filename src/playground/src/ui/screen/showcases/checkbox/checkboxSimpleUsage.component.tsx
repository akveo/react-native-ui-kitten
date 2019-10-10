import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CheckBox,
  Layout,
} from 'react-native-ui-kitten';

export class CheckboxSimpleUsageShowcase extends React.Component {

  state = {
    checked1: false,
  };

  onChecked1Change = (checked1) => {
    this.setState({ checked1 });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <CheckBox
          style={styles.checkbox}
          checked={this.state.checked1}
          onChange={this.onChecked1Change}
        />
        <CheckBox
          style={styles.checkbox}
          disabled
          checked={true}
        />
        <CheckBox
          style={styles.checkbox}
          disabled
          checked={false}
        />
      </Layout>
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
