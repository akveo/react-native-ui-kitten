import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectGroup, SelectItem } from '@ui-kitten/components';

export const SelectWithGroupsShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0, 1));
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([
    new IndexPath(0, 1),
    new IndexPath(0, 2),
  ]);

  const onDefaultSelect = (index) => {
    setSelectedIndex(index);
  };

  const onMultiSelect = (index) => {
    setMultiSelectedIndex(index);
  };

  return (
    <Layout style={styles.container}>

      <Select
        style={styles.select}
        placeholder='Default'
        selectedIndex={selectedIndex}
        onSelect={onDefaultSelect}>
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
        onSelect={onMultiSelect}>
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
    height: 320,
  },
  select: {
    flex: 1,
    margin: 2,
  },
});

