import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Toggle,
} from 'react-native-ui-kitten';

export class ToggleInlineStylingShowcase extends React.Component {

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
          checked={this.state.checked}
          text='Place your Text'
          textStyle={styles.text}
          onChange={this.onToggleValueChange}
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
  text: {
    color: '#3366FF',
    fontSize: 18,
  },
});
