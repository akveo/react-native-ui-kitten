import React from 'react';
import { StyleSheet } from 'react-native';
import { Radio } from '@ui-kitten/components';

export const RadioInlineStylingShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <Radio
      style={styles.radio}
      text='Place your text'
      textStyle={styles.radioText}
      checked={checked}
      onChange={onCheckedChange}
    />
  );
};

const styles = StyleSheet.create({
  radio: {
    width: 32,
    height: 32,
  },
  radioText: { color: '#3366FF' },
});
