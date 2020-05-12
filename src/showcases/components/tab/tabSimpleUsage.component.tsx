import React from 'react';
import { Icon, Tab } from '@ui-kitten/components';

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);

export const TabSimpleUsageShowcase = () => (
  <Tab title='USERS' icon={PersonIcon}/>
);
