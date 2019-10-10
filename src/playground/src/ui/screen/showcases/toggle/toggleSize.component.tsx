import React, { useState } from 'react';
import { Toggle } from 'react-native-ui-kitten';
import {
  StyleSheet,
  View,
} from 'react-native';

export const ToggleSizeShowcase = () => {
  const [checked, onChange] = useState(false);

  const onToggleValueChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <View style={styles.item}>
      <Toggle
        checked={checked}
        size='tiny'
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={checked}
        size='small'
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={checked}
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={checked}
        size='large'
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={checked}
        size='giant'
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
