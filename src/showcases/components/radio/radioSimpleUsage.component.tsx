import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Radio, Layout, Text } from '@ui-kitten/components';

const STATUSES = ['primary', 'success', 'info', 'warning', 'danger', 'basic'] as const;

const Label: React.FC<{ children: string }> = ({ children }) => (
  <Text category="s1" style={styles.label}>{children}</Text>
);

export const RadioSimpleUsageShowcase = (): React.ReactElement => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Layout style={styles.container} level="1">

      <Label>Statuses (Checked)</Label>
      <Layout style={styles.row} level="1">
        {STATUSES.map((s) => (
          <Radio key={s} style={styles.radio} status={s} checked>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Radio>
        ))}
        <View style={styles.controlContainer}>
          <Radio style={styles.radio} status="control" checked>
            Control
          </Radio>
        </View>
      </Layout>

      <Label>States</Label>
      <Layout style={styles.row} level="1">
        <Radio
          style={styles.radio}
          checked={checked}
          onChange={setChecked}
        >
          {`Checked: ${checked}`}
        </Radio>
        <Radio style={styles.radio} checked={false} disabled>
          Disabled
        </Radio>
        <Radio style={styles.radio} checked disabled>
          Checked + Disabled
        </Radio>
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
  radio: {
    margin: 4,
  },
  controlContainer: {
    margin: 4,
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#3366FF',
  },
});
