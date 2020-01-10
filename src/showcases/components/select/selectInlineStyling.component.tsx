import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from '@ui-kitten/components';

export const SelectInlineStylingShowcase = () => {

  const data = [
    { text: 'Option 1' },
    {
      text: 'Option 2',
      textStyle: styles.option2,
    },
    { text: 'Option 3' },
  ];

  const [selectedOption, setSelectedOption] = React.useState(null);

  return (
    <Layout style={styles.container}>
      <Select
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        controlStyle={styles.controlStyle}
        data={data}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 228,
  },
  labelStyle: {
    color: 'gray',
  },
  placeholderStyle: {
    color: 'gray',
  },
  controlStyle: {
    borderRadius: 8,
  },
  option2: {
    color: 'red',
    fontSize: 18,
  },
});
