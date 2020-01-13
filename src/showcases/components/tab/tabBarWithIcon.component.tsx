/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Icon,
  Layout,
  Tab,
  TabBar,
} from '@ui-kitten/components';

const PersonIcon = (style) => (
  <Icon {...style} name='person-outline'/>
);

const BellIcon = (style) => (
  <Icon {...style} name='bell-outline'/>
);

const EmailIcon = (style) => (
  <Icon {...style} name='email-outline'/>
);

export const TabBarWithIconShowcase = () => {

  const [topTabsIndex, setTopTabsIndex] = React.useState(0);
  const [bottomTabsIndex, setBottomTabsIndex] = React.useState(0);

  return (
    <Layout>

      <TabBar
        selectedIndex={topTabsIndex}
        onSelect={setTopTabsIndex}>
        <Tab icon={PersonIcon}/>
        <Tab icon={BellIcon}/>
        <Tab icon={EmailIcon}/>
      </TabBar>

      <TabBar
        selectedIndex={bottomTabsIndex}
        onSelect={setBottomTabsIndex}>
        <Tab title='USERS' icon={PersonIcon}/>
        <Tab title='ORDERS' icon={BellIcon}/>
        <Tab title='TRANSACTIONS' icon={EmailIcon}/>
      </TabBar>

    </Layout>
  );
};
