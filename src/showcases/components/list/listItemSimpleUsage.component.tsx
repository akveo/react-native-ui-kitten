import React from 'react';
import { Avatar, Button, ListItem } from '@ui-kitten/components';

const InstallButton = (props) => (
  <Button size='tiny'>
    INSTALL
  </Button>
);

const ItemImage = (props) => (
  <Avatar
    {...props}
    style={[props.style, { tintColor: null }]}
    source={require('../../assets/icon.png')}
  />
);

export const ListItemSimpleUsageShowcase = () => (
  <ListItem
    title='UI Kitten'
    description='A set of React Native components'
    accessoryLeft={ItemImage}
    accessoryRight={InstallButton}
  />
);
