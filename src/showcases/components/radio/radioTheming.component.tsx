import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Radio } from '@ui-kitten/components';

export const RadioThemingShowcase = () => {

  const [activeChecked, setActiveChecked] = React.useState(true);

  const onActiveCheckedChange = (isChecked) => {
    setActiveChecked(isChecked);
  };

  return (
    <Layout style={styles.container}>

      <Radio
        style={styles.radio}
        checked={activeChecked}
        onChange={onActiveCheckedChange}>
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
    margin: 8,
  },
});

