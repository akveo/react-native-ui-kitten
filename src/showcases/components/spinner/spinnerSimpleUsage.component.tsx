import React from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Layout, Text } from '@ui-kitten/components';

const STATUSES = ['primary', 'success', 'info', 'warning', 'danger', 'basic'] as const;
const SIZES = ['tiny', 'small', 'medium', 'large', 'giant'] as const;

const Label: React.FC<{ children: string }> = ({ children }) => (
  <Text category="s1" style={styles.label}>{children}</Text>
);

export const SpinnerSimpleUsageShowcase = (): React.ReactElement => (
  <Layout style={styles.container} level="1">

    <Label>Statuses</Label>
    <Layout style={styles.row} level="1">
      {STATUSES.map((s) => (
        <Spinner key={s} style={styles.spinner} status={s} />
      ))}
    </Layout>

    <Label>Sizes</Label>
    <Layout style={styles.row} level="1">
      {SIZES.map((s) => (
        <Spinner key={s} style={styles.spinner} size={s} />
      ))}
    </Layout>

  </Layout>
);

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
    alignItems: 'center',
  },
  spinner: {
    margin: 8,
  },
});
