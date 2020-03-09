import React from 'react';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon}/>
);

export const TopNavigationSimpleUsageShowcase = () => (
  <TopNavigation
    accessoryLeft={BackAction}
    title='Eva Application'
  />
);
