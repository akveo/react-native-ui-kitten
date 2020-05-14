import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem } from '@ui-kitten/components';

const data = new Array(8).fill({
  title: 'Item',
});

export const ListSimpleUsageShowcase = () => {

  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`}/>
  );

  return (
    <List
      style={styles.container}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
});
