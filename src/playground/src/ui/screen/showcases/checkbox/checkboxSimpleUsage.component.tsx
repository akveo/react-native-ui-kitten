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
          text='Active'
          checked={this.state.checked1}
          onChange={this.onChecked1Change}
        />
        <CheckBox
          style={styles.checkbox}
          text='Disabled'
          disabled={true}
        />
        <CheckBox
          style={styles.checkbox}
          text='Checked Disabled'
          disabled={true}
          checked={true}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  checkbox: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
});
