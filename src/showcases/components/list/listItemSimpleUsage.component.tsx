import React from 'react';
import { Avatar, Button, ListItem } from '@ui-kitten/components';

const InstallButton = (): React.ReactElement => (
  <Button size='tiny'>
    INSTALL
  </Button>
);

const ItemImage = (props): React.ReactElement => (
  <Avatar
    {...props}
    // eslint-disable-next-line react-native/no-inline-styles,react/prop-types
    style={[props.style, { tintColor: null }]}
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
