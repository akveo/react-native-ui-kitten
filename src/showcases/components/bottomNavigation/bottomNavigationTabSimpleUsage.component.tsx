import React from 'react';
import { BottomNavigationTab, Icon } from '@ui-kitten/components';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

export const BottomNavigationTabSimpleUsageShowcase = () => (
  <BottomNavigationTab
    title='USERS'
    icon={StarIcon}
  />
);
