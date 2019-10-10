import React from 'react';
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
      data={data}
      renderItem={renderItem}
    />
  );
};
