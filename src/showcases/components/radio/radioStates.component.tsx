import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Radio,
} from '@ui-kitten/components';

export const RadioStatesShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <Layout style={styles.container}>

      <Radio
        style={styles.radio}
        text='Active'
        checked={checked}
        onChange={onCheckedChange}
      />

      <Radio
        style={styles.radio}
        text='Disabled'
        disabled={true}
      />

      <Radio
        style={styles.radio}
        text='Checked Disabled'
        checked={true}
        disabled={true}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    margin: 8,
  },
});

