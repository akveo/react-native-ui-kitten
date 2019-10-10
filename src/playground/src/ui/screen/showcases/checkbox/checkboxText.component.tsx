import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  CheckBox,
} from 'react-native-ui-kitten';

export class CheckboxTextShowcase extends React.Component {

  state = {
    checked: false,
  };

  onCheckedChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <CheckBox
          checked={this.state.checked}
          text='Place your Text'
          onChange={this.onCheckedChange}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
