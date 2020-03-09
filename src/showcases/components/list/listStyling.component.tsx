import React from 'react';
import { List, ListItem, Text } from '@ui-kitten/components';

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const MyListItem = (props) => (
  <ListItem
    title={evaProps => <Text {...evaProps}>{props.title}</Text>}
    description={evaProps => <Text {...evaProps}>{props.desc}</Text>}
  />
);

export const ListStylingShowcase = () => {

  const renderItem = ({ item, index }) => (
    <MyListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
    />
  );

  return (
    <List
      data={data}
      renderItem={renderItem}
    />
  );
};
