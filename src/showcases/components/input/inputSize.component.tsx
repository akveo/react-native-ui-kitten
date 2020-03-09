import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export const InputSizeShowcase = () => {

  const smallInputState = useInputState();
  const mediumInputState = useInputState();
  const largeInputState = useInputState();

  return (
    <Layout>

      <Input
        style={styles.input}
        size='small'
        placeholder='Small'
        {...smallInputState}
      />

      <Input
        style={styles.input}
        size='medium'
        placeholder='Medium'
        {...mediumInputState}
      />

      <Input
        style={styles.input}
        size='large'
        placeholder='Large'
        {...largeInputState}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
  },
});

