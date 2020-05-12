import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Radio } from '@ui-kitten/components';

export const RadioStatesShowcase = () => {

  const [activeChecked, setActiveChecked] = React.useState(false);

  return (
    <Layout style={styles.container} level='1'>

      <Radio
        style={styles.radio}
        checked={activeChecked}
        onChange={nextChecked => setActiveChecked(nextChecked)}>
        Active
      </Radio>

      <Radio
        style={styles.radio}
        disabled={true}>
        Disabled
      </Radio>

      <Radio
        style={styles.radio}
        checked={true}
        disabled={true}>
        Checked Disabled
      </Radio>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    margin: 2,
  },
});

