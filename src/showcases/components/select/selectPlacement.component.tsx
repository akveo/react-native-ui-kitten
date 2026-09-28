import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';

export const SelectPlacementShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const row = (selectedIndex as IndexPath).row;

  return (
    <Layout
      testID='select-placement'
      style={styles.container}
      level='1'
    >
      <Text testID='select-placement-value'>{`Selected: ${row + 1}`}</Text>
      <Select
        testID='select-placement-select'
        style={styles.select}
        placement='top start'
        popoverProps={{ fullWidth: false, style: styles.popover }}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <SelectItem testID='select-placement-option-1' title='Narrow control, wide list, option 1' />
        <SelectItem testID='select-placement-option-2' title='Narrow control, wide list, option 2' />
        <SelectItem testID='select-placement-option-3' title='Narrow control, wide list, option 3' />
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 96,
    justifyContent: 'flex-end',
  },
  select: {
    width: 160,
  },
  popover: {
    width: 320,
  },
});
