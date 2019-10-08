import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { CheckBox } from 'react-native-ui-kitten';

export const CheckboxInlineStylingShowcase = () => {
  const [checked, onChange] = useState(false);

  const onStateChange = (value): void => {
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        checked={checked}
        text='This is Checkbox Component'
        textStyle={styles.text}
        onChange={onStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    color: 'green',
    fontSize: 20,
  },
});
