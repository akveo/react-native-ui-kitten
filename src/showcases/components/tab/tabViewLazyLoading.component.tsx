import React from 'react';
import {
  Tab,
  TabView,
  Text,
} from '@ui-kitten/components';

export const TabViewLazyLoadingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <TabView
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={setSelectedIndex}>
      <Tab title='USERS'>
        <Text>List of users.</Text>
      </Tab>
      <Tab title='ORDERS'>
        <Text>List of orders.</Text>
      </Tab>
      <Tab title='TRANSACTIONS'>
        <Text>ORDERS</Text>
      </Tab>
    </TabView>
  );
};
