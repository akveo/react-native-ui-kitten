import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Select,
  SelectElement,
  SelectProps,
} from '@ui-kitten/components';

export const SelectShowcase = (props: SelectProps): SelectElement => {

  const [selectedOption, setSelectedOption] = React.useState(props.selectedOption);

  const onSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Select
      {...props}
      style={styles.select}
      selectedOption={selectedOption}
      onSelect={onSelect}
    />
  );
};

const styles = StyleSheet.create({
  select: {
    width: 200,
  },
});
