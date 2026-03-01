import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Toggle, Layout, Text } from '@ui-kitten/components';

const STATUSES = ['primary', 'success', 'info', 'warning', 'danger', 'basic'] as const;

const Label: React.FC<{ children: string }> = ({ children }) => (
  <Text category="s1" style={styles.label}>{children}</Text>
);

export const ToggleSimpleUsageShowcase = (): React.ReactElement => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Layout style={styles.container} level="1">

      <Label>Statuses (Checked)</Label>
      <Layout style={styles.row} level="1">
        {STATUSES.map((s) => (
          <Toggle key={s} style={styles.toggle} status={s} checked>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Toggle>
        ))}
        <View style={styles.controlContainer}>
          <Toggle style={styles.toggle} status="control" checked>
            Control
          </Toggle>
        </View>
      </Layout>

      <Label>States</Label>
      <Layout style={styles.row} level="1">
        <Toggle
          style={styles.toggle}
          checked={checked}
          onChange={setChecked}
        >
          {`Checked: ${checked}`}
        </Toggle>
        <Toggle style={styles.toggle} checked={false} disabled>
          Disabled Off
        </Toggle>
        <Toggle style={styles.toggle} checked disabled>
          Disabled On
        </Toggle>
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
  toggle: {
    margin: 4,
  },
  controlContainer: {
    margin: 4,
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#3366FF',
  },
});
