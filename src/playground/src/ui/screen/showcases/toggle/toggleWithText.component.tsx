import React, { useState } from 'react';
import { Toggle } from 'react-native-ui-kitten';
import {
  StyleSheet,
  View,
} from 'react-native';

export const ToggleWithTextShowcase = () => {
  const [checked, onChange] = useState(false);

  const onToggleValueChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <View style={styles.item}>
      <Toggle
        checked={checked}
        style={styles.item}
        text='This is a Toggle'
        onChange={onToggleValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    marginBottom: 16,
  },
});
