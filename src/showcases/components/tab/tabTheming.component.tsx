import React from 'react';
import { Icon, Tab, TabBar } from '@ui-kitten/components';

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline'/>
);

const EmailIcon = (props) => (
  <Icon {...props} name='email-outline'/>
);
export const TabThemingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab icon={PersonIcon} title='USERS'/>
      <Tab icon={BellIcon} title='ORDERS'/>
      <Tab icon={EmailIcon} title='TRANSACTIONS'/>
    </TabBar>
  );
};
