import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-ui-kitten';

export class InputInlineStylingShowcase extends React.Component {

  state = {
    inputValue: '',
  };

  onChangeText = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Input
        value={this.state.inputValue}
        placeholder='Place your Text'
        style={styles.input}
        textStyle={styles.inputText}
        labelStyle={styles.inputLabel}
        captionTextStyle={styles.inputCaption}
        onChangeText={this.onChangeText}
        label='LABEL'
        caption='CAPTION'
      />
    );
  }
}

const styles = StyleSheet.create({
  input: { borderRadius: 24 },
  inputText: { color: '#3366FF' },
  inputLabel: { color: '#3366FF' },
  inputCaption: { color: '#3366FF' },
});
