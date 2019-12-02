import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
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

export const InputStatusShowcase = () => {

  const primaryInputChanges = useInputChanges();
  const successInputChanges = useInputChanges();
  const infoInputChanges = useInputChanges();
  const warningInputChanges = useInputChanges();
  const dangerInputChanges = useInputChanges();
  const basicInputChanges = useInputChanges();
  const controlInputChanges = useInputChanges();

  return (
    <Layout>

      <Input
        style={styles.input}
        status='primary'
        placeholder='Primary'
        {...primaryInputChanges}
      />

      <Input
        style={styles.input}
        status='success'
        placeholder='Success'
        {...successInputChanges}
      />

      <Input
        style={styles.input}
        status='info'
        placeholder='Info'
        {...infoInputChanges}
      />

      <Input
        style={styles.input}
        status='warning'
        placeholder='Warning'
        {...warningInputChanges}
      />

      <Input
        style={styles.input}
        status='danger'
        placeholder='Danger'
        {...dangerInputChanges}
      />

      <Input
        style={styles.input}
        status='basic'
        placeholder='Basic'
        {...basicInputChanges}
      />

      <View style={styles.controlContainer}>
        <Input
          style={styles.input}
          status='control'
          placeholder='Control'
          {...controlInputChanges}
        />
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});

