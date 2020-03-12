import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Toggle } from '@ui-kitten/components';

export const ToggleStatesShowcase = () => {

  const [activeChecked, setActiveChecked] = React.useState(false);

  const onActiveCheckedChange = (isChecked) => {
    setActiveChecked(isChecked);
  };

  return (
    <Layout style={styles.container} level='1'>

      <Toggle
        style={styles.toggle}
        checked={activeChecked}
        onChange={onActiveCheckedChange}>
        Active
      </Toggle>

      <Toggle
        style={styles.toggle}
        disabled={true}>
        Disabled
      </Toggle>

      <Toggle
        style={styles.toggle}
        checked={true}
        disabled={true}>
        Checked Disabled
      </Toggle>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggle: {
    margin: 2,
  },
});
