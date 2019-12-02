import React from 'react';
import {
  Tab,
  TabBar,
} from 'react-native-ui-kitten';

export const TabBarSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}>
      <Tab title='USERS'/>
      <Tab title='ORDERS'/>
      <Tab title='TRANSACTIONS'/>
    </TabBar>
  );
};
