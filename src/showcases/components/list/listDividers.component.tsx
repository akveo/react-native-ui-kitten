import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem } from '@ui-kitten/components';

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});

export const ListDividersShowcase = (): React.ReactElement => {

  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
    />
  );

  return (
    <List
      style={styles.container}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
});
