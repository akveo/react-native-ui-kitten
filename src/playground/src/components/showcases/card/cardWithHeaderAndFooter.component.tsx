import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Card,
  CardHeader,
  Text,
} from '@ui-kitten/components';

const Header = () => (
  <CardHeader
    title='Maldives'
    description='By Wikipedia'
  />
);

const Footer = () => (
  <View style={styles.footerContainer}>
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'>
      CANCEL
    </Button>
    <Button
      style={styles.footerControl}
      size='small'>
      ACCEPT
    </Button>
  </View>
);

export const CardWithHeaderAndFooterShowcase = () => (
  <Card header={Header} footer={Footer}>
    <Text>
      The Maldives, officially the Republic of Maldives, is a small country in South Asia,
      located in the Arabian Sea of the Indian Ocean.
      It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
    </Text>
  </Card>
);

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 4,
  },
});
