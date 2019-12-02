import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';

export const TextAppearancesShowcase = () => (
  <Layout>

    <Text style={styles.text} appearance='default'>Default</Text>

    <Text style={styles.text} appearance='hint'>Hint</Text>

    <View style={styles.alternativeContainer}>
      <Text style={styles.text} appearance='alternative'>Alternative</Text>
    </View>

  </Layout>
);

const styles = StyleSheet.create({
  text: {
    margin: 8,
  },
  alternativeContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});
