import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Toggle,
} from 'react-native-ui-kitten';

export class ToggleSimpleUsageShowcase extends React.Component {

  state = {
    checked: false,
  };

  onToggleValueChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Toggle
          style={styles.toggle}
          checked={this.state.checked}
          onChange={this.onToggleValueChange}
        />
        <Toggle
          style={styles.toggle}
          checked={false}
          disabled
        />
        <Toggle
          style={styles.toggle}
          checked={true}
          disabled={true}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  toggle: {
    marginVertical: 8,
  },
});
