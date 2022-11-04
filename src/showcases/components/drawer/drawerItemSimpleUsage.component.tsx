import React from 'react';
import { DrawerItem, Icon, IconElement } from '@ui-kitten/components';

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

export const DrawerItemSimpleUsageShowcase = (): React.ReactElement => (
  <DrawerItem
    title='Users'
    accessoryLeft={StarIcon}
    accessoryRight={ForwardIcon}
  />
);
