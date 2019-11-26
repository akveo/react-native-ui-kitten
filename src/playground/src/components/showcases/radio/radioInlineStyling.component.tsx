import React from 'react';
import { StyleSheet } from 'react-native';
import { Radio } from 'react-native-ui-kitten';

export class RadioInlineStylingShowcase extends React.Component {

  state = {
    checked: false,
  };

  onChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Radio
        style={styles.radio}
        textStyle={styles.radioText}
        checked={this.state.checked}
        text='Place your text'
        onChange={this.onChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  radio: {
    width: 32,
    height: 32,
  },
  radioText: { color: '#3366FF' },
});
