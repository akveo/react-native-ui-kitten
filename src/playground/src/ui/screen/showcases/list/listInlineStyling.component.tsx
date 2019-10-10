import React from 'react';
import { StyleSheet } from 'react-native';
import {
  List,
  ListItem,
} from 'react-native-ui-kitten';

const SAMPLE_DATA = {
  title: 'Title for Item',
  description: 'Description for Item',
};

export const ListInlineStylingShowcase = (props) => {

  const data = new Array(8).fill(SAMPLE_DATA);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index}`}
      description={`${item.description} ${index}`}
    />
  );

  return (
    <List
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 8 },
});
