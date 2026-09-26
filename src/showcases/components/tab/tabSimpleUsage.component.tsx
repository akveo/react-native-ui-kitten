import React from 'react';
import { Icon, IconElement, Tab } from '@ui-kitten/components';

const PersonIcon = (props): IconElement => (
  <Icon
    {...props}
    name='person-outline'
  />
);

export const TabSimpleUsageShowcase = (): React.ReactElement => (
  <Tab
    testID='tab-single'
    title='USERS'
    icon={PersonIcon}
  />
);
