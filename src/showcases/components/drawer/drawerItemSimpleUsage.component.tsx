import React from 'react';
import { DrawerItem, Icon } from '@ui-kitten/components';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export const DrawerItemSimpleUsageShowcase = () => (
  <DrawerItem
    title='Users'
    accessoryLeft={StarIcon}
    accessoryRight={ForwardIcon}
  />
);
