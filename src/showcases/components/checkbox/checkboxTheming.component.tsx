import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox, Layout } from '@ui-kitten/components';

export const CheckboxThemingShowcase = () => {

  const [activeChecked, setActiveChecked] = React.useState(true);
  const [indeterminateChecked, setIndeterminateChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(true);

  const onIndeterminateChange = (isChecked, isIndeterminate) => {
    setIndeterminateChecked(isChecked);
    setIndeterminate(isIndeterminate);
  };

  return (
    <Layout style={styles.container} level='1'>

      <CheckBox
        style={styles.checkbox}
        checked={activeChecked}
        onChange={nextChecked => setActiveChecked(nextChecked)}>
        Active
      </CheckBox>

      <CheckBox
        style={styles.checkbox}
        checked={indeterminateChecked}
        indeterminate={indeterminate}
        onChange={onIndeterminateChange}>
        Indeterminate
      </CheckBox>

      <CheckBox
        style={styles.checkbox}
        disabled={true}>
        Disabled
      </CheckBox>

      <CheckBox
        style={styles.checkbox}
        disabled={true}
        checked={true}>
        Checked Disabled
      </CheckBox>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    margin: 2,
  },
});
