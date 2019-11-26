import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {
  Layout,
  Card,
  Text,
} from 'react-native-ui-kitten';

const bodyText: string = 'A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. ' +
  'Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way.';
const headerImageUri: string = 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704__340.jpg';

export const CustomHeader = () => {
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

export const CardCustomHeaderShowcase = () => (
  <Layout style={styles.container}>
    <Card header={CustomHeader}>
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
});
