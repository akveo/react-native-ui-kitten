import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Toggle,
} from 'react-native-ui-kitten';

export class ToggleWithTextShowcase extends React.Component {

  state = {
    checked: false,
  };

  onChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Toggle
          checked={this.state.checked}
          text='Place your Text'
          onChange={this.onChange}
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
