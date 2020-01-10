import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';

export const TextCategoriesShowcase = () => (
  <Layout>

    <Text style={styles.text} category='h1'>H1</Text>

    <Text style={styles.text} category='h2'>H2</Text>

    <Text style={styles.text} category='h3'>H3</Text>

    <Text style={styles.text} category='h4'>H4</Text>

    <Text style={styles.text} category='h5'>H5</Text>

    <Text style={styles.text} category='h6'>H6</Text>

    <Text style={styles.text} category='s1'>S1</Text>

    <Text style={styles.text} category='s2'>S2</Text>

    <Text style={styles.text} category='p1'>P1</Text>

    <Text style={styles.text} category='p2'>P2</Text>

    <Text style={styles.text} category='c1'>C1</Text>

    <Text style={styles.text} category='c2'>C2</Text>

    <Text style={styles.text} category='label'>LABEL</Text>

  </Layout>
);

const styles = StyleSheet.create({
  text: {
    margin: 8,
  },
});
