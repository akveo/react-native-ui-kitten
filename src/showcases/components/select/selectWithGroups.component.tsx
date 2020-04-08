import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectGroup, SelectItem } from '@ui-kitten/components';

export const SelectWithGroupsShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0, 1));
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([
    new IndexPath(0, 0),
    new IndexPath(1, 1),
  ]);

  return (
    <Layout style={styles.container} level='1'>

      <Select
        style={styles.select}
        placeholder='Default'
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <SelectGroup title='Group 1'>
          <SelectItem title='Option 1.1'/>
          <SelectItem title='Option 1.2'/>
          <SelectItem title='Option 1.3'/>
        </SelectGroup>
        <SelectGroup title='Group 2'>
          <SelectItem title='Option 2.1'/>
          <SelectItem title='Option 2.2'/>
          <SelectItem title='Option 2.3'/>
        </SelectGroup>
      </Select>

      <Select
        style={styles.select}
        multiSelect={true}
        placeholder='Multi'
        selectedIndex={multiSelectedIndex}
        onSelect={index => setMultiSelectedIndex(index)}>
        <SelectGroup title='Group 1'>
          <SelectItem title='Option 1.1'/>
          <SelectItem title='Option 1.2'/>
          <SelectItem title='Option 1.3'/>
        </SelectGroup>
        <SelectGroup title='Group 2'>
          <SelectItem title='Option 2.1'/>
          <SelectItem title='Option 2.2'/>
          <SelectItem title='Option 2.3'/>
        </SelectGroup>
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

