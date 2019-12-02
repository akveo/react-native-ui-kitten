import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-ui-kitten';

export const CheckboxInlineStylingShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <CheckBox
      style={styles.checkbox}
      textStyle={styles.text}
      checked={checked}
      text='Place your Text'
      onChange={onCheckedChange}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
  },
  text: {
    color: '#3366FF',
    fontSize: 18,
  },
});
