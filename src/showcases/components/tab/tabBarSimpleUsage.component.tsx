import React from 'react';
import { Tab, TabBar } from '@ui-kitten/components';

export const TabBarSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='USERS'/>
      <Tab title='ORDERS'/>
      <Tab title='TRANSACTIONS'/>
    </TabBar>
  );
};
