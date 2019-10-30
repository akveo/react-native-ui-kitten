import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Card,
  CardHeader,
  Text,
} from 'react-native-ui-kitten';

const bodyText: string = 'A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. ' +
  'Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way.';

const Header = () => (
  <CardHeader
    title='Title'
    description='Description'
  />
);

export const CardEvaHeaderShowcase = () => (
  <Layout style={styles.container}>
    <Card header={Header}>
      <Text style={styles.bodyText}>
        {bodyText}
      </Text>
    </Card>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  card: {
    marginVertical: 6,
  },
  bodyText: {
    color: '#8f8b8b',
  },
});
