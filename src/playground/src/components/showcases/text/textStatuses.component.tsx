import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';

export const TextStatusesShowcase = () => (
  <Layout>

    <Text style={styles.text} status='primary'>Primary</Text>

    <Text style={styles.text} status='success'>Success</Text>

    <Text style={styles.text} status='info'>Info</Text>

    <Text style={styles.text} status='warning'>Warning</Text>

    <Text style={styles.text} status='danger'>Danger</Text>

    <Text style={styles.text} status='basic'>Basic</Text>

    <View style={styles.controlContainer}>
      <Text style={styles.text} status='control'>Control</Text>
    </View>

  </Layout>
);

const styles = StyleSheet.create({
  text: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});
