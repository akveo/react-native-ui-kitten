import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';

export const CardStatusesShowcase = () => (
  <Layout style={styles.container} level='1'>

    <Card style={styles.card} status='primary'>
      <Text>Primary</Text>
    </Card>

    <Card style={styles.card} status='success'>
      <Text>Success</Text>
    </Card>

    <Card style={styles.card} status='info'>
      <Text>Info</Text>
    </Card>

    <Card style={styles.card} status='warning'>
      <Text>Warning</Text>
    </Card>

    <Card style={styles.card} status='danger'>
      <Text>Danger</Text>
    </Card>

    <Card style={styles.card} status='basic'>
      <Text>Basic</Text>
    </Card>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    margin: 2,
  },
});
