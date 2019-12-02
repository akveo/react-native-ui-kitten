import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Input,
  Layout,
} from '@ui-kitten/components';

const useInputChanges = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return {
    value,
    onChangeText: setValue,
  };
};

export const InputSizeShowcase = () => {

  const smallInputChanges = useInputChanges();
  const mediumInputChanges = useInputChanges();
  const largeInputChanges = useInputChanges();

  return (
    <Layout>

      <Input
        style={styles.input}
        size='small'
        placeholder='Small'
        {...smallInputChanges}
      />

      <Input
        style={styles.input}
        size='medium'
        placeholder='Medium'
        {...mediumInputChanges}
      />

      <Input
        style={styles.input}
        size='large'
        placeholder='Large'
        {...largeInputChanges}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
});

