import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';

const OPTIONS = Array.from({ length: 30 }, (_, index) => `Option ${index + 1}`);

export const SelectScrollToSelectedShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(29));
  const row = (selectedIndex as IndexPath).row;

  return (
    <Layout
      testID='select-scroll'
      style={styles.container}
      level='1'
    >
      <Text testID='select-scroll-value'>{`Selected: ${row + 1}`}</Text>
      <Select
        testID='select-scroll-select'
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        {OPTIONS.map((title, index) => (
          <SelectItem
            key={title}
            testID={`select-scroll-option-${index + 1}`}
            title={title}
          />
        ))}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
});
