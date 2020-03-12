import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Radio } from '@ui-kitten/components';

const useRadioState = (initialCheck = false) => {
  const [checked, setChecked] = React.useState(initialCheck);
  return { checked, onChange: setChecked };
};

export const RadioStatusShowcase = () => {

  const primaryRadioState = useRadioState();
  const successRadioState = useRadioState();
  const infoRadioState = useRadioState();
  const warningRadioState = useRadioState();
  const dangerRadioState = useRadioState();
  const basicRadioState = useRadioState();
  const controlRadioState = useRadioState();

  return (
    <Layout style={styles.container} level='1'>

      <Radio
        style={styles.radio}
        status='primary'
        {...primaryRadioState}>
        Primary
      </Radio>

      <Radio
        style={styles.radio}
        status='success'
        {...successRadioState}>
        Success
      </Radio>

      <Radio
        style={styles.radio}
        status='info'
        {...infoRadioState}>
        Info
      </Radio>

      <Radio
        style={styles.radio}
        status='warning'
        {...warningRadioState}>
        Warning
      </Radio>

      <Radio
        style={styles.radio}
        status='danger'
        {...dangerRadioState}>
        Danger
      </Radio>

      <Radio
        style={styles.radio}
        status='basic'
        {...basicRadioState}>
        Basic
      </Radio>

      <View style={styles.controlContainer}>
        <Radio
          style={styles.radio}
          status='control'
          {...controlRadioState}>
          Control
        </Radio>
      </View>

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
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },
});
