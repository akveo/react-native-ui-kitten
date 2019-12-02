import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  ViewPager,
} from 'react-native-ui-kitten';

export const ViewPagerInlineStylingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}>
      <Layout
        level='2'
        style={styles.tab}>
        <Text category='h5'>Tab 1</Text>
      </Layout>
      <Layout
        level='2'
        style={styles.tab}>
        <Text category='h5'>Tab 2</Text>
      </Layout>
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  tab: {
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
