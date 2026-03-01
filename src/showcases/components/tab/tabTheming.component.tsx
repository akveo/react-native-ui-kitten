import React from 'react';
import { Icon, IconElement, Tab, TabBar } from '@ui-kitten/components';

const PersonIcon = (props): IconElement => (
  <Icon
    {...props}
    name='person-outline'
  />
);

const BellIcon = (props): IconElement => (
  <Icon
    {...props}
    name='bell-outline'
  />
);

const EmailIcon = (props): IconElement => (
  <Icon
    {...props}
    name='email-outline'
  />
);
export const TabThemingShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Tab
        icon={PersonIcon}
        title='USERS'
      />
      <Tab
        icon={BellIcon}
        title='ORDERS'
      />
      <Tab
        icon={EmailIcon}
        title='TRANSACTIONS'
      />
    </TabBar>
  );
};
