import React from 'react';
import { Button, Icon, IconElement, List, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

export const ListAccessoriesShowcase = (): React.ReactElement => {

  const renderItemAccessory = (): React.ReactElement => (
    <Button size='tiny'>
FOLLOW
    </Button>
  );

  const renderItemIcon = (props): IconElement => (
    <Icon
      {...props}
      name='person'
    />
  );

  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
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
