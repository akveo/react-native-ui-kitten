import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectGroup, SelectItem } from '@ui-kitten/components';

const data = [
  'Developer',
  'Designer',
  'Product Manager',
];

const groupedData = {
  'UI/UX': [
    'Frontend Developer',
    'Designer',
  ],
  'Management': [
    'Product Manager',
    'Business Analyst',
  ],
};

export const SelectDisplayValueShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(new IndexPath(0));
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState<IndexPath[]>([
    new IndexPath(0, 0),
    new IndexPath(1, 1),
  ]);

  const displayValue = data[selectedIndex.row];
  const groupDisplayValues = multiSelectedIndex.map(index => {
    const groupTitle = Object.keys(groupedData)[index.section];
    return groupedData[groupTitle][index.row];
  });

  const renderOption = (title): React.ReactElement => (
    <SelectItem title={title} />
  );

  const renderGroup = (title): React.ReactElement => (
    <SelectGroup title={title}>
      {groupedData[title].map(renderOption)}
    </SelectGroup>
  );

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <Select
        style={styles.select}
        placeholder='Default'
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={(index: IndexPath) => setSelectedIndex(index)}
      >
        {data.map(renderOption)}
      </Select>

      <Select
        style={styles.select}
        multiSelect={true}
        placeholder='Multi'
        value={groupDisplayValues.join(', ')}
        selectedIndex={multiSelectedIndex}
        onSelect={(index: IndexPath[]) => setMultiSelectedIndex(index)}
      >
        {Object.keys(groupedData).map(renderGroup)}
      </Select>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 192,
  },
  select: {
    flex: 1,
    margin: 2,
  },
});

