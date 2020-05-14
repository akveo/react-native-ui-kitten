import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

export const TextAppearancesShowcase = () => (
  <React.Fragment>

    <Text style={styles.text}>
      Default Text.
    </Text>

    <Text style={styles.text} appearance='hint'>
      Hint Text.
    </Text>

    <View style={styles.alternativeContainer}>
      <Text style={styles.text} appearance='alternative'>
        Alternative Text.
      </Text>
    </View>

  </React.Fragment>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
  alternativeContainer: {
    borderRadius: 4,
    marginVertical: 2,
    backgroundColor: '#3366FF',
  },
});
