import React from 'react';
import { StyleSheet } from 'react-native';
import { Toggle } from 'react-native-ui-kitten';

export class ToggleInlineStylingShowcase extends React.Component {

  state = {
    checked: false,
  };

  onToggleValueChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Toggle
        checked={this.state.checked}
        text='Place your Text'
        textStyle={styles.text}
        onChange={this.onToggleValueChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#3366FF',
    fontSize: 18,
  },
});
