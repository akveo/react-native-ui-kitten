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

export const ButtonSimpleUsageShowcase = (): React.ReactElement => {
  const [presses, setPresses] = React.useState(0);
  const [longPresses, setLongPresses] = React.useState(0);
  const onPress = (): void => setPresses((n) => n + 1);
  const onLongPress = (): void => setLongPresses((n) => n + 1);
  return (
  <Layout style={styles.container} level="1">
    <Text testID="button-press-count" category="s1">{`Presses: ${presses} / Long: ${longPresses}`}</Text>

    <Label>Appearances</Label>
    <Layout style={styles.row} level="1">
      <Button testID="button-filled" style={styles.button} appearance="filled" onPress={onPress}>FILLED</Button>
      <Button testID="button-outline" style={styles.button} appearance="outline" onPress={onPress}>OUTLINE</Button>
      <Button testID="button-ghost" style={styles.button} appearance="ghost" onPress={onPress}>GHOST</Button>
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
      <Button testID="button-giant" style={styles.button} size="giant" onPress={onPress}>GIANT</Button>
    </Layout>

    <Label>States</Label>
    <Layout style={styles.row} level="1">
      <Button testID="button-enabled" style={styles.button} onPress={onPress} onLongPress={onLongPress}>ENABLED</Button>
      <Button testID="button-disabled" style={styles.button} disabled onPress={onPress}>DISABLED</Button>
      <Button style={styles.button} appearance="ghost" disabled testID="button-ghost-disabled" onPress={onPress}>GHOST</Button>
    </Layout>

    <Label>Accessories</Label>
    <Layout style={styles.row} level="1">
      <Button testID="button-left-icon" style={styles.button} accessoryLeft={StarIcon} onPress={onPress}>LEFT ICON</Button>
      <Button style={styles.button} accessoryRight={StarIcon}>RIGHT ICON</Button>
      <Button testID="button-icon-only" style={styles.button} accessoryLeft={StarIcon} onPress={onPress} />
      <Button testID="button-ghost-icon-only" style={styles.button} appearance="ghost" accessoryLeft={StarIcon} onPress={onPress} />
      <Button style={styles.button} appearance="outline" accessoryLeft={LoadingIndicator}>LOADING</Button>
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
