import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputProps } from '@ui-kitten/components';

const useInputState = (initialValue = ''): InputProps => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export const InputSizeShowcase = (): React.ReactElement => {

  const smallInputState = useInputState();
  const mediumInputState = useInputState();
  const largeInputState = useInputState();
  const multilineInputState = useInputState();

  return (
    <>

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

      <Input
        multiline={true}
        textStyle={styles.inputTextStyle}
        placeholder='Multiline'
        {...multilineInputState}
      />

    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
  },
  inputTextStyle: {
    minHeight: 64,
  },
});

