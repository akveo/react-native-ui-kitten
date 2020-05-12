import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox, Layout } from '@ui-kitten/components';

const useCheckboxState = (initialCheck = false) => {
  const [checked, setChecked] = React.useState(initialCheck);
  return { checked, onChange: setChecked };
};

export const CheckboxStatusShowcase = () => {

  const primaryCheckboxState = useCheckboxState();
  const successCheckboxState = useCheckboxState();
  const infoCheckboxState = useCheckboxState();
  const warningCheckboxState = useCheckboxState();
  const dangerCheckboxState = useCheckboxState();
  const basicCheckboxState = useCheckboxState();
  const controlCheckboxState = useCheckboxState();

  return (
    <Layout style={styles.container} level='1'>

      <CheckBox
        style={styles.checkbox}
        status='primary'
        {...primaryCheckboxState}>
        Primary
      </CheckBox>

      <CheckBox
        style={styles.checkbox}
        status='success'
        {...successCheckboxState}>
        Success
      </CheckBox>

      <CheckBox
        style={styles.checkbox}
        status='info'
        {...infoCheckboxState}>
        Info
      </CheckBox>

      <CheckBox
        style={styles.checkbox}
        status='warning'
        {...warningCheckboxState}>
        Warning
      </CheckBox>

      <CheckBox
        style={styles.checkbox}
        status='danger'
        {...dangerCheckboxState}>
        Danger
      </CheckBox>

      <CheckBox
        style={styles.checkbox}
        status='basic'
        {...basicCheckboxState}>
        Basic
      </CheckBox>

      <View style={styles.controlContainer}>
        <CheckBox
          style={styles.checkbox}
          status='control'
          {...controlCheckboxState}>
          Control
        </CheckBox>
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    margin: 2,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },
});
