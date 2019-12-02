import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CheckBox,
  Layout,
} from '@ui-kitten/components';

export const CheckboxStatesShowcase = () => {

  const [activeChecked, setActiveChecked] = React.useState(false);
  const [indeterminateChecked, setIndeterminateChecked] = React.useState(true);
  const [indeterminate, setIndeterminate] = React.useState(false);

  const onActiveChange = (isChecked) => {
    setActiveChecked(isChecked);
  };

  const onIndeterminateChange = (isChecked, isIndeterminate) => {
    setIndeterminateChecked(isChecked);
    setIndeterminate(isIndeterminate);
  };

  return (
    <Layout style={styles.container}>

      <CheckBox
        style={styles.checkbox}
        text='Active'
        checked={activeChecked}
        onChange={onActiveChange}
      />

      <CheckBox
        style={styles.checkbox}
        text='Indeterminate'
        checked={indeterminateChecked}
        indeterminate={indeterminate}
        onChange={onIndeterminateChange}
      />

      <CheckBox
        style={styles.checkbox}
        text='Disabled'
        disabled={true}
      />

      <CheckBox
        style={styles.checkbox}
        text='Checked Disabled'
        disabled={true}
        checked={true}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    margin: 8,
  },
});
