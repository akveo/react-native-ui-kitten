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

const useTabBarState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};


export const TabBarAccessoriesShowcase = () => {

  const topState = useTabBarState();
  const bottomState = useTabBarState();

  return (
    <React.Fragment>

      <TabBar {...topState}>
        <Tab icon={PersonIcon}/>
        <Tab icon={BellIcon}/>
        <Tab icon={EmailIcon}/>
      </TabBar>

      <TabBar {...bottomState}>
        <Tab title='USERS' icon={PersonIcon}/>
        <Tab title='ORDERS' icon={BellIcon}/>
        <Tab title='TRANSACTIONS' icon={EmailIcon}/>
      </TabBar>

    </React.Fragment>
  );
};
