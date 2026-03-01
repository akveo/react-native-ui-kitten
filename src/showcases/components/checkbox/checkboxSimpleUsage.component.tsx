import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox, Layout, Text } from '@ui-kitten/components';

const STATUSES = ['primary', 'success', 'info', 'warning', 'danger', 'basic'] as const;

const Label: React.FC<{ children: string }> = ({ children }) => (
  <Text category="s1" style={styles.label}>{children}</Text>
);

export const CheckboxSimpleUsageShowcase = (): React.ReactElement => {
  const [checked, setChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);

  return (
    <Layout style={styles.container} level="1">

      <Label>Statuses</Label>
      <Layout style={styles.row} level="1">
        {STATUSES.map((s) => (
          <CheckBox key={s} style={styles.checkbox} status={s} checked>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </CheckBox>
        ))}
        <View style={styles.controlContainer}>
          <CheckBox style={styles.checkbox} status="control" checked>
            Control
          </CheckBox>
        </View>
      </Layout>

      <Label>States</Label>
      <Layout style={styles.row} level="1">
        <CheckBox
          style={styles.checkbox}
          checked={checked}
          onChange={setChecked}
        >
          {`Checked: ${checked}`}
        </CheckBox>
        <CheckBox
          style={styles.checkbox}
          checked={false}
          indeterminate={!indeterminate}
          onChange={() => setIndeterminate(!indeterminate)}
        >
          Indeterminate
        </CheckBox>
        <CheckBox style={styles.checkbox} checked={false} disabled>
          Disabled
        </CheckBox>
        <CheckBox style={styles.checkbox} checked disabled>
          Checked + Disabled
        </CheckBox>
      </Layout>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    margin: 4,
  },
  controlContainer: {
    margin: 4,
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#3366FF',
  },
});
