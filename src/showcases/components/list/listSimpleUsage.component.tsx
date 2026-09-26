import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Text } from '@ui-kitten/components';

const data = new Array(8).fill({
  title: 'Item',
});

export const ListSimpleUsageShowcase = (): React.ReactElement => {
  const [pressed, setPressed] = React.useState(0);

  const renderItem = ({ item, index }: { item: { title: string }; index: number }): React.ReactElement => (
    <ListItem
      testID={`list-item-${index + 1}`}
      title={`${item.title} ${index + 1}`}
      onPress={() => setPressed(index + 1)}
    />
  );

  return (
    <>
    <Text testID="list-value">{`Pressed item: ${pressed}`}</Text>
    <List
      testID="list"
      style={styles.container}
      data={data}
      renderItem={renderItem}
    />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
});
