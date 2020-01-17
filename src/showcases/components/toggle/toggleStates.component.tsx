import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Toggle,
} from '@ui-kitten/components';

export const ToggleStatesShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <Layout style={styles.container}>

      <Toggle
        style={styles.toggle}
        text='Active'
        checked={checked}
        onChange={onCheckedChange}
      />

      <Toggle
        style={styles.toggle}
        text='Disabled'
        disabled={true}
      />

      <Toggle
        style={styles.toggle}
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
  toggle: {
    margin: 8,
  },
});
