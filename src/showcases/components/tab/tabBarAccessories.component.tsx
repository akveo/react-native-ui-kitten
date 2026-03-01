import React from 'react';
import { Icon, IconElement, Tab, TabBar, TabBarProps } from '@ui-kitten/components';

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

const useTabBarState = (initialState = 0): Partial<TabBarProps> => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};


export const TabBarAccessoriesShowcase = (): React.ReactElement => {

  const topState = useTabBarState();
  const bottomState = useTabBarState();

  return (
    <>

      <TabBar {...topState}>
        <Tab icon={PersonIcon} />
        <Tab icon={BellIcon} />
        <Tab icon={EmailIcon} />
      </TabBar>

      <TabBar {...bottomState}>
        <Tab
          title='USERS'
          icon={PersonIcon}
        />
        <Tab
          title='ORDERS'
          icon={BellIcon}
        />
        <Tab
          title='TRANSACTIONS'
          icon={EmailIcon}
        />
      </TabBar>

    </>
  );
};
