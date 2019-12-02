import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  Layout,
  Text,
} from '@ui-kitten/components';

const Header = () => (
  <CardHeader title='Maldives'/>
);

export const CardStatusesShowcase = () => (
  <Layout>

    <Card style={styles.card} header={Header} status='success'>
      <Text>
        The Maldives, officially the Republic of Maldives, is a small country in South Asia,
        located in the Arabian Sea of the Indian Ocean.
        It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
      </Text>
    </Card>

    <Card style={styles.card} header={Header} status='danger'>
      <Text>
        The Maldives, officially the Republic of Maldives, is a small country in South Asia,
        located in the Arabian Sea of the Indian Ocean.
        It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
      </Text>
    </Card>

  </Layout>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});
