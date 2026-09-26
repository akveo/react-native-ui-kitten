import React from 'react';
import { ImageProps, StyleSheet } from 'react-native';
import { Avatar, Button, ListItem, Text } from '@ui-kitten/components';

const InstallButton = ({ onPress }: { onPress: () => void }): React.ReactElement => (
  <Button testID='list-item-install' size='tiny' onPress={onPress}>
    INSTALL
  </Button>
);

const ItemImage = (props: ImageProps): React.ReactElement => (
  <Avatar
    {...props}
    style={[props.style, styles.itemImage]}
    source={require('../../assets/icon.png')}
  />
);

export const ListItemSimpleUsageShowcase = (): React.ReactElement => {
  const [last, setLast] = React.useState('none');
  return (
    <>
      <Text testID='list-item-value'>{`Last press: ${last}`}</Text>
      <ListItem
        testID='list-item-row'
        title='UI Kitten'
        description='A set of React Native components'
        accessoryLeft={ItemImage}
        accessoryRight={() => <InstallButton onPress={() => setLast('install')} />}
        onPress={() => setLast('row')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemImage: {
    tintColor: null,
  },
});
