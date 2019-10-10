import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CheckBox,
  Layout,
} from 'react-native-ui-kitten';

export class CheckboxInlineStylingShowcase extends React.Component {

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
          textStyle={styles.text}
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
  text: {
    color: '#3366FF',
    fontSize: 18,
  },
});
