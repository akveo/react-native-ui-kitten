import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Layout, Text } from '@ui-kitten/components';

const STATUSES = ['primary', 'success', 'info', 'warning', 'danger', 'basic'] as const;

const Label: React.FC<{ children: string }> = ({ children }) => (
  <Text category="s1" style={styles.label}>{children}</Text>
);

export const InputSimpleUsageShowcase = (): React.ReactElement => {
  const [value, setValue] = React.useState('');

  return (
    <Layout style={styles.container} level="1">

      <Label>Statuses</Label>
      {STATUSES.map((s) => (
        <Input
          key={s}
          style={styles.input}
          status={s}
          placeholder={s.charAt(0).toUpperCase() + s.slice(1)}
        />
      ))}
      <View style={styles.controlContainer}>
        <Input style={styles.input} status="control" placeholder="Control" />
      </View>

      <Label>Sizes</Label>
      <Input style={styles.input} size="small" placeholder="Small" />
      <Input style={styles.input} size="medium" placeholder="Medium" />
      <Input style={styles.input} size="large" placeholder="Large" />

      <Label>States</Label>
      <Input
        style={styles.input}
        placeholder="Active"
        value={value}
        onChangeText={setValue}
      />
      <Input style={styles.input} placeholder="Disabled" disabled />

      <Label>With Label & Caption</Label>
      <Input
        style={styles.input}
        label="Email"
        placeholder="john@example.com"
        caption="Enter a valid email address"
      />

      <Label>Multiline</Label>
      <Input
        style={styles.input}
        multiline
        textStyle={styles.multiline}
        placeholder="Multiline input..."
      />

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
  input: {
    marginVertical: 2,
  },
  controlContainer: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#3366FF',
  },
  multiline: {
    minHeight: 64,
  },
});
