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

export const CardSimpleUsageShowcase = (): React.ReactElement => {
  const [presses, setPresses] = React.useState(0);
  return (
  <Layout style={styles.container} level="1">
    <Text testID="card-press-count" category="s1">{`Card presses: ${presses}`}</Text>
    <Card
      testID="card-pressable"
      style={styles.card}
      onPress={() => setPresses((n) => n + 1)}
      header={(props) => <Text {...props} category="h6">Header</Text>}
      footer={(props) => <Text {...props} appearance="hint">Footer</Text>}
    >
      <CardContent text="Pressable card with header and footer" />
    </Card>

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
};

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
