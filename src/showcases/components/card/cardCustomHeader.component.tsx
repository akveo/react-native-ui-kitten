import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import {
  Card,
  Text,
} from '@ui-kitten/components';

export const CustomHeader = () => (
  <React.Fragment>
    <Image
      style={styles.headerImage}
      source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704__340.jpg' }}
    />
    <Text
      style={styles.headerText}
      category='h6'>
      Maldives
    </Text>
  </React.Fragment>
);

export const CardCustomHeaderShowcase = () => (
  <Card header={CustomHeader}>
    <Text>
      The Maldives, officially the Republic of Maldives, is a small country in South Asia,
      located in the Arabian Sea of the Indian Ocean.
      It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
    </Text>
  </Card>
);

const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  headerImage: {
    flex: 1,
    height: 192,
  },
});
