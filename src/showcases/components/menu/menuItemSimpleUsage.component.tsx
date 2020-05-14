import React from 'react';
import { Icon, MenuItem } from '@ui-kitten/components';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export const MenuItemSimpleUsageShowcase = () => (
  <MenuItem
    title='Users'
    accessoryLeft={StarIcon}
    accessoryRight={ForwardIcon}
  />
);
