import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

export const TextAppearancesShowcase = () => (
  <Layout style={styles.container}>

    <View style={styles.column}>

      <Text style={styles.text}>
        Default. Use as regular text.
      </Text>
      <Text style={styles.text} appearance='hint'>
        Hint. Use when needed to give user a hint on action.
      </Text>
      <View style={styles.alternativeContainer}>
        <Text style={styles.text} appearance='alternative'>
          Alternative. Use when needed to display light text in light theme.
          And vice versa.
        </Text>
      </View>

    </View>

    <View style={styles.column}>

      <View style={styles.row}>
        <Text style={styles.text} category='h1'>H1</Text>
        <Text style={styles.text} category='h2'>H2</Text>
        <Text style={styles.text} category='h3'>H3</Text>
        <Text style={styles.text} category='h4'>H4</Text>
        <Text style={styles.text} category='h5'>H5</Text>
        <Text style={styles.text} category='h6'>H6</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text} category='s1'>S1</Text>
        <Text style={styles.text} category='s2'>S2</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text} category='p1'>P1</Text>
        <Text style={styles.text} category='p2'>P2</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text} category='c1'>C1</Text>
        <Text style={styles.text} category='c2'>C2</Text>
        <Text style={styles.text} category='label'>LABEL</Text>
      </View>

    </View>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
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
