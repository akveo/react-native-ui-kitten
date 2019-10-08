import React, { useState } from 'react';
import { Toggle } from 'react-native-ui-kitten';
import {
  StyleSheet,
  View,
} from 'react-native';

export const ToggleSimpleUsageShowcase = () => {
  const [checked, onChange] = useState(false);

  const onToggleValueChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <View style={styles.item}>
      <Toggle
        checked={checked}
        style={styles.item}
        onChange={onToggleValueChange}
      />
      <Toggle
        checked={false}
        disabled
        style={styles.item}
      />
      <Toggle
        checked={true}
        disabled
        style={styles.item}
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
