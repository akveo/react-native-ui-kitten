import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';

const STATUSES = ['primary', 'success', 'info', 'warning', 'danger', 'basic'] as const;

const Label: React.FC<{ children: string }> = ({ children }) => (
  <Text category="s1" style={styles.label}>{children}</Text>
);

const CardContent: React.FC<{ text: string }> = ({ text }) => (
  <Text>{text}</Text>
);

export const CardSimpleUsageShowcase = (): React.ReactElement => (
  <Layout style={styles.container} level="1">

    <Label>Filled</Label>
    {STATUSES.map((s) => (
      <Card key={s} style={styles.card} appearance="filled" status={s}>
        <CardContent text={`Filled / ${s}`} />
      </Card>
    ))}

    <Label>Outline</Label>
    {STATUSES.map((s) => (
      <Card key={s} style={styles.card} appearance="outline" status={s}>
        <CardContent text={`Outline / ${s}`} />
      </Card>
    ))}

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
  card: {
    marginVertical: 4,
  },
});
