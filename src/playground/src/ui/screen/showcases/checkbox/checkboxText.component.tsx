import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-ui-kitten';

export class CheckboxTextShowcase extends React.Component {

  state = {
    checked: false,
  };

  onCheckedChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <CheckBox
        style={styles.checkbox}
        checked={this.state.checked}
        text='Place your Text'
        onChange={this.onCheckedChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
  },
});
