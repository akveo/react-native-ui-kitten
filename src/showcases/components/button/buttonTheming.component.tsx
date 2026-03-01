import React from 'react';
import { ImageProps, StyleSheet, View } from 'react-native';
import { Button, Icon, IconElement, Layout, Spinner } from '@ui-kitten/components';

const StarIcon = (props): IconElement => (
  <Icon
    {...props}
    name='star'
  />
);

const LoadingIndicator = (props: ImageProps): React.ReactElement => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size='small' />
  </View>
);

export const ButtonThemingShowcase = (): React.ReactElement => (
  <Layout
    style={styles.container}
    level='1'
  >

    <Button
      style={styles.button}
      status='primary'
      accessoryLeft={StarIcon}
    >
      PRIMARY
    </Button>

    <Button
      style={styles.button}
      status='success'
      accessoryRight={StarIcon}
    >
      SUCCESS
    </Button>

    <Button
      style={styles.button}
      status='danger'
      accessoryLeft={StarIcon}
    />

    <Button
      style={styles.button}
      appearance='ghost'
      status='danger'
      accessoryLeft={StarIcon}
    />

    <Button
      style={styles.button}
      appearance='outline'
      accessoryLeft={LoadingIndicator}
    >
      LOADING
    </Button>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 2,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
