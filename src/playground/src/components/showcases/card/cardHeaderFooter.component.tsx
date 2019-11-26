import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Layout,
  Card,
  Text,
  Button,
  CardHeader,
} from 'react-native-ui-kitten';

const bodyText: string = 'A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. ' +
  'Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way.';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Button
        size='small'
        style={styles.footerControl}>
        Accept
      </Button>
      <Button
        size='small'
        status='basic'>
        Cancel
      </Button>
    </View>
  );
};

const Header = () => (
  <CardHeader
    title='Title'
    description='Description'
  />
);

export const CardHeaderFooterShowcase = () => (
  <Layout style={styles.container}>
    <Card
      header={Header}
      footer={Footer}>
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginRight: 12,
  },
});
