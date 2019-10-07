import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  CheckBox,
} from 'react-native-ui-kitten';

export const CheckboxStatusShowcase = (): React.ReactElement => {
  const [checked1, onChange1] = useState(false);
  const [checked2, onChange2] = useState(false);
  const [checked3, onChange3] = useState(false);
  const [checked4, onChange4] = useState(false);
  const [checked5, onChange5] = useState(false);
  const [checked6, onChange6] = useState(false);

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
      case 4:
        onChange4(value);
        break;
      case 5:
        onChange5(value);
        break;
      case 6:
        onChange6(value);
        break;
    }
  };

  return (
    <Layout style={styles.container}>
      <CheckBox
        style={styles.checkbox}
        status='primary'
        checked={checked1}
        onChange={(value: boolean) => onStateChange(value, 1)}
      />
      <CheckBox
        style={styles.checkbox}
        status='success'
        checked={checked2}
        onChange={(value: boolean) => onStateChange(value, 2)}
      />
      <CheckBox
        style={styles.checkbox}
        status='info'
        checked={checked3}
        onChange={(value: boolean) => onStateChange(value, 3)}
      />
      <CheckBox
        style={styles.checkbox}
        status='warning'
        checked={checked4}
        onChange={(value: boolean) => onStateChange(value, 4)}
      />
      <CheckBox
        style={styles.checkbox}
        status='danger'
        checked={checked5}
        onChange={(value: boolean) => onStateChange(value, 5)}
      />
      <CheckBox
        style={styles.checkbox}
        status='basic'
        checked={checked6}
        onChange={(value: boolean) => onStateChange(value, 6)}
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
