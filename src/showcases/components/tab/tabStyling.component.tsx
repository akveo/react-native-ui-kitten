import React from 'react';
import { Tab, TabBar, Text } from '@ui-kitten/components';

const MyTab = (props) => (
  <Tab
    {...props}
    title={evaProps => <Text {...evaProps}>{props.title}</Text>}
  />
);

export const TabStylingShowcase = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}>
      <MyTab title='USERS'/>
      <MyTab title='ORDERS'/>
      <MyTab title='TRANSACTIONS'/>
    </TabBar>
  );
};
