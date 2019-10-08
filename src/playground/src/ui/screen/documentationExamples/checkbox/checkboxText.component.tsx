import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { CheckBox } from 'react-native-ui-kitten';

export const CheckboxTextShowcase = () => {
  const [checked, onChange] = useState(false);

  const onStateChange = (value): void => {
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        checked={checked}
        text='This is Checkbox Component'
        onChange={onStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
