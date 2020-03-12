import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';

export const InputStatesShowcase = () => {

  const [value, setValue] = React.useState('');

  return (
    <Layout style={styles.container} level='1'>

      <Input
        style={styles.input}
        value={value}
        placeholder='Active'
        onChangeText={nextValue => setValue(nextValue)}
      />

      <Input
        style={styles.input}
        disabled={true}
        placeholder='Disabled'
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    margin: 2,
  },
});

