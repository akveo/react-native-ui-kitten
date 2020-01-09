import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from '@ui-kitten/components';

const data = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  {
    text: 'Option 3',
    items: [
      { text: 'Sub Option 1' },
      { text: 'Sub Option 2' },
    ],
  },
];

export const SelectWithGroupsShowcase = () => {

  const [selectedOption, setSelectedOption] = React.useState(null);

  return (
    <Layout style={styles.container}>
      <Select
        data={data}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
  },
});

