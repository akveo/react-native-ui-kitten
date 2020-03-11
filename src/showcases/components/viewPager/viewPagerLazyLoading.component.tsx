import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, ViewPager } from '@ui-kitten/components';

export const ViewPagerLazyLoadingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}>
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
