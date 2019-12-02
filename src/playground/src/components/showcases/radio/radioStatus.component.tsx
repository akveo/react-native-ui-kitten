import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Layout,
  Radio,
} from '@ui-kitten/components';

const useRadioChanges = (initialCheck = false) => {
  const [checked, setChecked] = React.useState(initialCheck);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return {
    checked,
    onChange: onCheckedChange,
  };
};

export const RadioStatusShowcase = () => {

  const primaryRadioChanges = useRadioChanges();
  const successRadioChanges = useRadioChanges();
  const infoRadioChanges = useRadioChanges();
  const warningRadioChanges = useRadioChanges();
  const dangerRadioChanges = useRadioChanges();
  const basicRadioChanges = useRadioChanges();
  const controlRadioChanges = useRadioChanges();

  return (
    <Layout style={styles.container}>

      <Radio
        style={styles.radio}
        status='primary'
        text='Primary'
        {...primaryRadioChanges}
      />

      <Radio
        style={styles.radio}
        status='success'
        text='Success'
        {...successRadioChanges}
      />

      <Radio
        style={styles.radio}
        status='info'
        text='Info'
        {...infoRadioChanges}
      />

      <Radio
        style={styles.radio}
        status='warning'
        text='Warning'
        {...warningRadioChanges}
      />

      <Radio
        style={styles.radio}
        status='danger'
        text='Danger'
        {...dangerRadioChanges}
      />

      <Radio
        style={styles.radio}
        status='basic'
        text='Basic'
        {...basicRadioChanges}
      />

      <View style={styles.controlContainer}>
        <Radio
          style={styles.radio}
          status='control'
          text='Control'
          {...controlRadioChanges}
        />
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
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    padding: 8,
    backgroundColor: '#3366FF',
  },
});
