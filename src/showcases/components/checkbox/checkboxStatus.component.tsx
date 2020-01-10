import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  CheckBox,
  Layout,
} from '@ui-kitten/components';

const useCheckboxChanges = (initialCheck = false) => {
  const [checked, setChecked] = React.useState(initialCheck);

  const onChange = (isChecked) => {
    setChecked(isChecked);
  };

  return {
    checked,
    onChange,
  };
};

export const CheckboxStatusShowcase = () => {

  const primaryCheckboxChanges = useCheckboxChanges();
  const successCheckboxChanges = useCheckboxChanges();
  const infoCheckboxChanges = useCheckboxChanges();
  const warningCheckboxChanges = useCheckboxChanges();
  const dangerCheckboxChanges = useCheckboxChanges();
  const basicCheckboxChanges = useCheckboxChanges();
  const controlCheckboxChanges = useCheckboxChanges();

  return (
    <Layout style={styles.container}>

      <CheckBox
        style={styles.checkbox}
        status='primary'
        text='Primary'
        {...primaryCheckboxChanges}
      />

      <CheckBox
        style={styles.checkbox}
        status='success'
        text='Success'
        {...successCheckboxChanges}
      />

      <CheckBox
        style={styles.checkbox}
        status='info'
        text='Info'
        {...infoCheckboxChanges}
      />

      <CheckBox
        style={styles.checkbox}
        status='warning'
        text='Warning'
        {...warningCheckboxChanges}
      />

      <CheckBox
        style={styles.checkbox}
        status='danger'
        text='Danger'
        {...dangerCheckboxChanges}
      />

      <CheckBox
        style={styles.checkbox}
        status='basic'
        text='Basic'
        {...basicCheckboxChanges}
      />

      <View style={styles.controlContainer}>
        <CheckBox
          style={styles.checkbox}
          status='control'
          text='Control'
          {...controlCheckboxChanges}
        />
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  checkbox: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});
