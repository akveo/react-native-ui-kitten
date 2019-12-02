import React from 'react';
import { StyleSheet } from 'react-native';
import { Toggle } from 'react-native-ui-kitten';

export const ToggleInlineStylingShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <Toggle
      checked={checked}
      text='Place your Text'
      textStyle={styles.text}
      onChange={onCheckedChange}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#3366FF',
    fontSize: 18,
  },
});
