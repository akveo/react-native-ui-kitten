import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from '@ui-kitten/components';

const data = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  { text: 'Option 3' },
  { text: 'Option 4' },
];

export const SelectStatesShowcase = () => {

  const [selectedOption, setSelectedOption] = React.useState(null);

  return (
    <Layout style={styles.container}>

      <Select
        style={styles.select}
        data={data}
        placeholder='Active'
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />

      <Select
        style={styles.select}
        data={data}
        placeholder='Disabled'
        disabled={true}
        onSelect={setSelectedOption}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 228,
  },
  select: {
    flex: 1,
    marginHorizontal: 4,
  },
});
