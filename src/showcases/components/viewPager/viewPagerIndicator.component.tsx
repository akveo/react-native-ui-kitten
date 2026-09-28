import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, PageIndicator, Text, ViewPager } from '@ui-kitten/components';

const PAGES = ['USERS', 'ORDERS', 'TRANSACTIONS', 'REPORTS'];

export const ViewPagerIndicatorShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [pageWidth, setPageWidth] = React.useState(0);

  return (
    <Layout
      testID='view-pager-indicator'
      level='1'
    >
      <Text testID='view-pager-indicator-value'>{`Page: ${selectedIndex + 1}`}</Text>
      <Text testID='view-pager-indicator-progress'>{`Progress: ${progress.toFixed(2)}`}</Text>
      <ViewPager
        testID='view-pager-indicator-pager'
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        // The pager lays out its content strip: pages x page width.
        onLayout={event => setPageWidth(event.nativeEvent.layout.width / PAGES.length)}
        onOffsetChange={offset => pageWidth > 0 && setProgress(offset / pageWidth)}
      >
        {PAGES.map(title => (
          <Layout
            key={title}
            style={styles.page}
            level='2'
          >
            <Text category='h5'>{title}</Text>
          </Layout>
        ))}
      </ViewPager>
      <PageIndicator
        testID='view-pager-indicator-dots'
        pageCount={PAGES.length}
        selectedIndex={selectedIndex}
        progress={progress}
        onSelect={setSelectedIndex}
        dotAccessibilityLabel={(index, count) => `Page ${index + 1} of ${count}`}
      />
      <PageIndicator
        testID='view-pager-indicator-danger'
        pageCount={PAGES.length}
        selectedIndex={selectedIndex}
        status='danger'
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  page: {
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
