import React from 'react';
import { ImageProps, StyleSheet } from 'react-native';
import { Avatar, Button, ListItem } from '@ui-kitten/components';

const InstallButton = (): React.ReactElement => (
  <Button size='tiny'>
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

export const ListItemSimpleUsageShowcase = (): React.ReactElement => (
  <ListItem
    title='UI Kitten'
    description='A set of React Native components'
    accessoryLeft={ItemImage}
    accessoryRight={InstallButton}
  />
);

const styles = StyleSheet.create({
  itemImage: {
    tintColor: null,
  },
});
