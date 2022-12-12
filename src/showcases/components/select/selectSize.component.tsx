import React from 'react';
import { StyleSheet } from 'react-native';
import { Select, SelectItem, SelectProps } from '@ui-kitten/components';

const useSelectState = (initialState = undefined): SelectProps => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const SelectSizeShowcase = (): React.ReactElement => {

  const smallSelectState = useSelectState();
  const mediumSelectState = useSelectState();
  const largeSelectState = useSelectState();

  return (
    <>

      <Select
        style={styles.select}
        size='small'
        placeholder='Small'
        {...smallSelectState}
      >
        <SelectItem title='Option 1' />
        <SelectItem title='Option 2' />
        <SelectItem title='Option 3' />
      </Select>

      <Select
        style={styles.select}
        size='medium'
        placeholder='Medium'
        {...mediumSelectState}
      >
        <SelectItem title='Option 1' />
        <SelectItem title='Option 2' />
        <SelectItem title='Option 3' />
      </Select>

      <Select
        style={styles.select}
        size='large'
        placeholder='Large'
        {...largeSelectState}
      >
        <SelectItem title='Option 1' />
        <SelectItem title='Option 2' />
        <SelectItem title='Option 3' />
      </Select>

    </>
  );
};

const styles = StyleSheet.create({
  select: {
    marginVertical: 2,
  },
});
