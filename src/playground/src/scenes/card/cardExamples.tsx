import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  CardFooterElement,
  CardHeader,
  CardHeaderElement,
  Text,
  TextElement,
} from 'react-native-ui-kitten';

export const Body = (): TextElement => (
  <Text>
    The Maldives, officially the Republic of Maldives, is a small country in South Asia,
    located in the Arabian Sea of the Indian Ocean.
    It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
  </Text>
);

export const Header = () => (
  <CardHeader
    title='Maldives'
    description='By Wikipedia'
  />
);

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

export const Footer = () => (
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

const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  headerImage: {
    flex: 1,
    height: 192,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 4,
  },
});
