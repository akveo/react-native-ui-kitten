import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export const InputStatusShowcase = () => {

  const primaryInputState = useInputState();
  const successInputState = useInputState();
  const infoInputState = useInputState();
  const warningInputState = useInputState();
  const dangerInputState = useInputState();
  const basicInputState = useInputState();
  const controlInputState = useInputState();

  return (
    <React.Fragment>

      <Input
        style={styles.input}
        status='primary'
        placeholder='Primary'
        {...primaryInputState}
      />

      <Layout style={styles.rowContainer} level='1'>
        <Input
          style={styles.input}
          status='success'
          placeholder='Success'
          {...successInputState}
        />
        <Input
          style={styles.input}
          status='info'
          placeholder='Info'
          {...infoInputState}
        />
      </Layout>

      <Layout style={styles.rowContainer} level='1'>
        <Input
          style={styles.input}
          status='warning'
          placeholder='Warning'
          {...warningInputState}
        />

        <Input
          style={styles.input}
          status='danger'
          placeholder='Danger'
          {...dangerInputState}
        />
      </Layout>

      <Layout style={styles.rowContainer} level='1'>
        <Input
          style={styles.input}
          status='basic'
          placeholder='Basic'
          {...basicInputState}
        />

        <View style={styles.controlContainer}>
          <Input
            style={styles.input}
            status='control'
            placeholder='Control'
            {...controlInputState}
          />
        </View>
      </Layout>

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    margin: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },
});

