import React from 'react';
import { Image, StyleSheet, View, ViewProps } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';

// Layout cases from #1514 (a fixed-height card with a footer and a body that asks for all of the
// height) and #1255 (a body laid out as a row through `contentContainerStyle`).

const COVER = require('../../assets/icon.png');

const Header = (props: ViewProps): React.ReactElement => (
  <View {...props}>
    <Text category='h6'>Fixed height</Text>
    <Text category='s2'>Header</Text>
  </View>
);

const Footer = (props: ViewProps): React.ReactElement => (
  <View
    {...props}
    style={[props.style, styles.footer]}
  >
    <Text testID='card-layout-footer' category='p2'>Footer</Text>
  </View>
);

export const CardLayoutShowcase = (): React.ReactElement => (
  <Layout
    style={styles.container}
    level='1'
  >
    <Card
      testID='card-layout-fixed'
      style={styles.fixed}
      header={Header}
      footer={Footer}
    >
      <Image
        source={COVER}
        style={styles.cover}
      />
    </Card>

    <Card
      testID='card-layout-row'
      style={styles.row}
      contentContainerStyle={styles.rowBody}
    >
      <Image
        source={COVER}
        style={styles.thumb}
      />
      <View style={styles.rowText}>
        <Text category='h6'>Row body</Text>
        <Text testID='card-layout-row-text' category='p2'>contentContainerStyle: row, no padding</Text>
      </View>
    </Card>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  fixed: {
    height: 220,
    marginBottom: 16,
  },
  cover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  row: {
    marginBottom: 16,
  },
  rowBody: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
  },
  thumb: {
    width: 72,
    height: 72,
  },
  rowText: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
