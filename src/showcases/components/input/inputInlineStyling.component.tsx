import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';

export const InputInlineStylingShowcase = () => {

  const [value, setValue] = React.useState('');

  return (
    <Input
      value={value}
      placeholder='Place your Text'
      style={styles.input}
      textStyle={styles.inputText}
      labelStyle={styles.inputLabel}
      captionTextStyle={styles.inputCaption}
      onChangeText={setValue}
      label='LABEL'
      caption='CAPTION'
    />
  );
};

const styles = StyleSheet.create({
  input: { borderRadius: 20 },
  inputText: { color: '#3366FF' },
  inputLabel: { color: '#3366FF' },
  inputCaption: { color: '#3366FF' },
});
