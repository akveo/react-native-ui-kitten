import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Layout,
  Toggle,
} from '@ui-kitten/components';

const useToggleChanges = (initialCheck = false) => {
  const [checked, setChecked] = React.useState(initialCheck);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return {
    checked,
    onChange: onCheckedChange,
  };
};

export const ToggleStatusShowcase = () => {

  const primaryToggleChanges = useToggleChanges();
  const successToggleChanges = useToggleChanges();
  const infoToggleChanges = useToggleChanges();
  const warningToggleChanges = useToggleChanges();
  const dangerToggleChanges = useToggleChanges();
  const basicToggleChanges = useToggleChanges();
  const controlToggleChanges = useToggleChanges();

  return (
    <Layout style={styles.container}>

      <Toggle
        style={styles.toggle}
        text='Primary'
        status='primary'
        {...primaryToggleChanges}
      />

      <Toggle
        style={styles.toggle}
        text='Success'
        status='success'
        {...successToggleChanges}
      />

      <Toggle
        style={styles.toggle}
        text='Info'
        status='info'
        {...infoToggleChanges}
      />

      <Toggle
        style={styles.toggle}
        text='Warning'
        status='warning'
        {...warningToggleChanges}
      />

      <Toggle
        style={styles.toggle}
        text='Danger'
        status='danger'
        {...dangerToggleChanges}
      />

      <Toggle
        style={styles.toggle}
        text='Basic'
        status='basic'
        {...basicToggleChanges}
      />

      <View style={styles.controlContainer}>
        <Toggle
          style={styles.toggle}
          text='Control'
          status='control'
          {...controlToggleChanges}
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
  toggle: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});
