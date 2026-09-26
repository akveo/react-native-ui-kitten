import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';

export const SelectSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Text testID='select-value'>{`Selected: ${(selectedIndex as IndexPath).row + 1}`}</Text>
      <Select
        testID='select'
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <SelectItem testID='select-option-1' title='Option 1' />
        <SelectItem testID='select-option-2' title='Option 2' />
        <SelectItem testID='select-option-3' title='Option 3' />
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
});

