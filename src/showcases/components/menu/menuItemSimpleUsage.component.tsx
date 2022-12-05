import React from 'react';
import { Icon, IconElement, MenuItem } from '@ui-kitten/components';

const StarIcon = (props): IconElement => (
  <Icon
    {...props}
    name='star'
  />
);

const ForwardIcon = (props): IconElement => (
  <Icon
    {...props}
    name='arrow-ios-forward'
  />
);

export const MenuItemSimpleUsageShowcase = (): React.ReactElement => (
  <MenuItem
    title='Users'
    accessoryLeft={StarIcon}
    accessoryRight={ForwardIcon}
  />
);
