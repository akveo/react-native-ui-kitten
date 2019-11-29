import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  Button,
  CardFooterElement,
  CardHeader,
  CardHeaderElement,
  Text,
} from 'react-native-ui-kitten';

export const CardBodyContent = (): React.ReactElement<ViewProps> => {
  return (
    <Text appearance='hint'>
      A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
      Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way.
    </Text>
  );
};

export const EvaCardHeader = (): CardHeaderElement => {
  return (
    <CardHeader
      title='Title'
      description='Description'
    />
  );
};

export const CustomCardHeader = (): CardHeaderElement => {
  return (
    <React.Fragment>
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704__340.jpg' }}
        style={styles.headerImage}
      />
      <Text
        style={styles.headerText}
        category='h6'>
        Title
      </Text>
    </React.Fragment>
  );
};

export const CardFooter = (): CardFooterElement => {
  return (
    <View style={styles.footerContainer}>
      <Button
        style={styles.footerControl}
        size='small'>
        Accept
      </Button>
      <Button
        style={styles.footerControl}
        status='basic'
        size='small'>
        Cancel
      </Button>
    </View>
  );
};

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
