import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  CheckBox,
} from 'react-native-ui-kitten';

export const CheckboxSimpleUsageShowcase = (): React.ReactElement => {
  const [checked1, onChange1] = useState(false);
  const [checked2, onChange2] = useState(false);
  const [checked3, onChange3] = useState(false);

  const onStateChange = (value: boolean, index: number): void => {
    switch (index) {
      case 1:
        onChange1(value);
        break;
      case 2:
        onChange2(value);
        break;
      case 3:
        onChange3(value);
        break;
    }
  };

  return (
    <Layout style={styles.container}>
      <CheckBox
        style={styles.checkbox}
        checked={checked1}
        onChange={(value: boolean) => onStateChange(value, 1)}
      />
      <CheckBox
        style={styles.checkbox}
        disabled
        checked={checked2}
        onChange={(value: boolean) => onStateChange(value, 2)}
      />
      <CheckBox
        style={styles.checkbox}
        indeterminate={true}
        checked={checked3}
        onChange={(value: boolean) => onStateChange(value, 3)}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  checkbox: {
    marginBottom: 16,
  },
});
