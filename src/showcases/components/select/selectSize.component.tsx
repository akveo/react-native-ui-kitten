import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select, SelectItem } from '@ui-kitten/components';

const useSelectState = (initialState = undefined) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const SelectSizeShowcase = () => {

  const smallSelectState = useSelectState();
  const mediumSelectState = useSelectState();
  const largeSelectState = useSelectState();

  return (
    <React.Fragment>

      <Select
        style={styles.select}
        size='small'
        placeholder='Small'
        {...smallSelectState}>
        <SelectItem title='Option 1'/>
        <SelectItem title='Option 2'/>
        <SelectItem title='Option 3'/>
      </Select>

      <Select
        style={styles.select}
        size='medium'
        placeholder='Medium'
        {...mediumSelectState}>
        <SelectItem title='Option 1'/>
        <SelectItem title='Option 2'/>
        <SelectItem title='Option 3'/>
      </Select>

      <Select
        style={styles.select}
        size='large'
        placeholder='Large'
        {...largeSelectState}>
        <SelectItem title='Option 1'/>
        <SelectItem title='Option 2'/>
        <SelectItem title='Option 3'/>
      </Select>

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  select: {
    marginVertical: 2,
  },
});
