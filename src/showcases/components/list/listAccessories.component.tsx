import React from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

export const ListAccessoriesShowcase = () => {

  const renderItemAccessory = (props) => (
    <Button size='tiny'>FOLLOW</Button>
  );

  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
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
    maxHeight: 192,
  },
});
