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
          text='Active'
        />
        <CheckBox
          style={styles.checkbox}
          disabled={true}
          checked={false}
          text='Disabled'
        />
        <CheckBox
          style={styles.checkbox}
          disabled={true}
          checked={true}
          text='Checked Disabled'
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  checkbox: {
    marginHorizontal: 4,
  },
});
