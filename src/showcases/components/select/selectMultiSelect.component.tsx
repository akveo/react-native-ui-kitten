import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

export const SelectMultiSelectShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath[]>([
    new IndexPath(0),
    new IndexPath(1),
  ]);

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Select
        multiSelect={true}
        selectedIndex={selectedIndex}
        onSelect={(index: IndexPath[]) => setSelectedIndex(index)}
      >
        <SelectItem title='Option 1' />
        <SelectItem title='Option 2' />
        <SelectItem title='Option 3' />
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 128,
  },
});

