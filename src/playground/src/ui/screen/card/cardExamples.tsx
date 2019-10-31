import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Text,
  CardFooterElement,
  CardHeaderElement,
  CardHeader,
  Button,
} from 'react-native-ui-kitten';

const bodyText: string = 'A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. ' +
  'Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way.';
const headerImageUri: string = 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704__340.jpg';

export const CardBodyContent = (): React.ReactElement<ViewProps> => {
  return (
    <View>
      <Text style={styles.bodyText}>
        {bodyText}
      </Text>
    </View>
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
    <View>
      <Image
        source={{ uri: headerImageUri }}
        style={styles.headerImage}
      />
      <View style={styles.headerTextContainer}>
        <Text
          category='h6'
          style={styles.headerText}>
          Title
        </Text>
      </View>
    </View>
  );
};

export const CardFooter = (): CardFooterElement => {
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

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 15,
    lineHeight: 20,
    color: 'gray',
  },
  headerTextContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerText: {
    color: '#6e5f5e',
  },
  headerImage: {
    width: '100%',
    height: 230,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginRight: 12,
  },
});
