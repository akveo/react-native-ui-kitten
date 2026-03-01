import React from 'react';
import { ImageProps, StyleSheet, View } from 'react-native';
import { Button, Icon, IconElement, Layout, Spinner, Text } from '@ui-kitten/components';

const STATUSES = ['primary', 'success', 'info', 'warning', 'danger', 'basic'] as const;

const Label: React.FC<{ children: string }> = ({ children }) => (
  <Text category="s1" style={styles.label}>{children}</Text>
);

const StarIcon = (props): IconElement => (
  <Icon {...props} name="star" />
);

const LoadingIndicator = (props: ImageProps): React.ReactElement => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

export const ButtonSimpleUsageShowcase = (): React.ReactElement => (
  <Layout style={styles.container} level="1">

    <Label>Appearances</Label>
    <Layout style={styles.row} level="1">
      <Button style={styles.button} appearance="filled">FILLED</Button>
      <Button style={styles.button} appearance="outline">OUTLINE</Button>
      <Button style={styles.button} appearance="ghost">GHOST</Button>
    </Layout>

    <Label>Statuses (Filled)</Label>
    <Layout style={styles.row} level="1">
      {STATUSES.map((s) => (
        <Button key={s} style={styles.button} status={s}>{s.toUpperCase()}</Button>
      ))}
      <View style={styles.controlContainer}>
        <Button style={styles.button} status="control">CONTROL</Button>
      </View>
    </Layout>

    <Label>Statuses (Outline)</Label>
    <Layout style={styles.row} level="1">
      {STATUSES.map((s) => (
        <Button key={s} style={styles.button} appearance="outline" status={s}>{s.toUpperCase()}</Button>
      ))}
      <View style={styles.controlContainer}>
        <Button style={styles.button} appearance="outline" status="control">CONTROL</Button>
      </View>
    </Layout>

    <Label>Statuses (Ghost)</Label>
    <Layout style={styles.row} level="1">
      {STATUSES.map((s) => (
        <Button key={s} style={styles.button} appearance="ghost" status={s}>{s.toUpperCase()}</Button>
      ))}
      <View style={styles.controlContainer}>
        <Button style={styles.button} appearance="ghost" status="control">CONTROL</Button>
      </View>
    </Layout>

    <Label>Sizes</Label>
    <Layout style={styles.rowCenter} level="1">
      <Button style={styles.button} size="tiny">TINY</Button>
      <Button style={styles.button} size="small">SMALL</Button>
      <Button style={styles.button} size="medium">MEDIUM</Button>
      <Button style={styles.button} size="large">LARGE</Button>
      <Button style={styles.button} size="giant">GIANT</Button>
    </Layout>

    <Label>States</Label>
    <Layout style={styles.row} level="1">
      <Button style={styles.button}>ENABLED</Button>
      <Button style={styles.button} disabled>DISABLED</Button>
    </Layout>

    <Label>Accessories</Label>
    <Layout style={styles.row} level="1">
      <Button style={styles.button} accessoryLeft={StarIcon}>LEFT ICON</Button>
      <Button style={styles.button} accessoryRight={StarIcon}>RIGHT ICON</Button>
      <Button style={styles.button} accessoryLeft={StarIcon} />
      <Button style={styles.button} appearance="ghost" accessoryLeft={StarIcon} />
      <Button style={styles.button} appearance="outline" accessoryLeft={LoadingIndicator}>LOADING</Button>
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
  },
  rowCenter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  button: {
    margin: 2,
  },
  controlContainer: {
    margin: 2,
    padding: 6,
    borderRadius: 4,
    justifyContent: 'center',
    backgroundColor: '#3366FF',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
