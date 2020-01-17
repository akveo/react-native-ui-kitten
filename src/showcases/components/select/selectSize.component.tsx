import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from '@ui-kitten/components';

const useSelectChanges = (initialSelection = null) => {
  const [selectedOption, setSelectedOption] = React.useState(initialSelection);
  return {
    selectedOption,
    onSelect: setSelectedOption,
  };
};

const data = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  { text: 'Option 3' },
];

export const SelectSizeShowcase = () => {

  const smallSelectChanges = useSelectChanges();
  const mediumSelectChanges = useSelectChanges();
  const largeSelectChanges = useSelectChanges();

  return (
    <Layout>

      <Select
        style={styles.select}
        data={data}
        size='small'
        placeholder='Small'
        {...smallSelectChanges}
      />

      <Select
        style={styles.select}
        data={data}
        size='medium'
        placeholder='Medium'
        {...mediumSelectChanges}
      />

      <Select
        style={styles.select}
        data={data}
        size='large'
        placeholder='Large'
        {...largeSelectChanges}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  select: {
    margin: 8,
  },
});
