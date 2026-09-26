import React from 'react';
import { Tab, TabBar, Text } from '@ui-kitten/components';

export const TabBarSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>
    <Text testID='tab-bar-value'>{`Selected: ${selectedIndex + 1}`}</Text>
    <TabBar
      testID='tab-bar'
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Tab testID='tab-1' title='USERS' />
      <Tab testID='tab-2' title='ORDERS' />
      <Tab testID='tab-3' title='TRANSACTIONS' />
    </TabBar>
    </>
  );
};
