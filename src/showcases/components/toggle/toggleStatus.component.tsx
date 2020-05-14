import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Toggle } from '@ui-kitten/components';

const useToggleState = (initialState = false) => {
  const [checked, setChecked] = React.useState(initialState);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return { checked, onChange: onCheckedChange };
};

export const ToggleStatusShowcase = () => {

  const primaryToggleState = useToggleState();
  const successToggleState = useToggleState();
  const infoToggleState = useToggleState();
  const warningToggleState = useToggleState();
  const dangerToggleState = useToggleState();
  const basicToggleState = useToggleState();
  const controlToggleState = useToggleState();

  return (
    <Layout style={styles.container} level='1'>

      <Toggle
        style={styles.toggle}
        status='primary'
        {...primaryToggleState}>
        Primary
      </Toggle>

      <Toggle
        style={styles.toggle}
        status='success'
        {...successToggleState}>
        Success
      </Toggle>

      <Toggle
        style={styles.toggle}
        status='info'
        {...infoToggleState}>
        Info
      </Toggle>

      <Toggle
        style={styles.toggle}
        status='warning'
        {...warningToggleState}>
        Warning
      </Toggle>

      <Toggle
        style={styles.toggle}
        status='danger'
        {...dangerToggleState}>
        Danger
      </Toggle>

      <Toggle
        style={styles.toggle}
        status='basic'
        {...basicToggleState}>
        Basic
      </Toggle>

      <View style={styles.controlContainer}>
        <Toggle
          style={styles.toggle}
          status='control'
          {...controlToggleState}>
          Control
        </Toggle>
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggle: {
    margin: 2,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    padding: 6,
    backgroundColor: '#3366FF',
  },
});
