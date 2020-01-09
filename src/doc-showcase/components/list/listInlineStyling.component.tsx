import React from 'react';
import { StyleSheet } from 'react-native';
import {
  List,
  ListItem,
} from '@ui-kitten/components';

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

export const ListInlineStylingShowcase = () => {

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
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
