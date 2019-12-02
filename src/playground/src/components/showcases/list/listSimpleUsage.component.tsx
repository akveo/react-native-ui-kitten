import React from 'react';
import {
  List,
  ListItem,
} from 'react-native-ui-kitten';

const data = new Array(8).fill({
  title: 'Item',
});

export const ListSimpleUsageShowcase = () => {

  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`} />
  );

  return (
    <List
      data={data}
      renderItem={renderItem}
    />
  );
};
