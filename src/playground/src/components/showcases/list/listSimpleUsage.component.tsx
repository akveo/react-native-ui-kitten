import React from 'react';
import { StyleSheet } from 'react-native';
import {
  List,
  ListItem,
} from 'react-native-ui-kitten';

const SAMPLE_DATA = {
  title: 'Item',
};

export const ListSimpleUsageShowcase = (props) => {

  const data = new Array(8).fill(SAMPLE_DATA);

  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`} />
  );

  return (
    <List
      style={styles.list}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    height: 150,
  },
});
