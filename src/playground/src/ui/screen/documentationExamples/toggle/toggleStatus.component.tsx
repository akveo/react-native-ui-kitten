import React, { useState } from 'react';
import { Toggle } from 'react-native-ui-kitten';
import {
  StyleSheet,
  View,
} from 'react-native';

export const ToggleStatusShowcase = () => {
  const [checked, onChange] = useState(false);

  const onToggleValueChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <View style={styles.item}>
      <Toggle
        checked={checked}
        status='primary'
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={checked}
        status='success'
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={checked}
        status='info'
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={checked}
        status='danger'
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={checked}
        status='warning'
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={checked}
        style={styles.item}
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
