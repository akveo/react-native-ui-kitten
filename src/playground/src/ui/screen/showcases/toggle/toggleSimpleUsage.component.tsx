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
          text='Active'
          checked={this.state.checked}
          onChange={this.onToggleValueChange}
        />
        <Toggle
          style={styles.toggle}
          text='Disabled'
          disabled={true}
        />
        <Toggle
          style={styles.toggle}
          text='Checked Disabled'
          checked={true}
          disabled={true}
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
  toggle: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
});
