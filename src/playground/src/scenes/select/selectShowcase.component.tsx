import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Select,
  SelectElement,
  SelectOption,
  SelectProps,
} from '@ui-kitten/components';

interface AdditionalProps {
  preselectedItem?: SelectOption;
}

export const SelectShowcase = (props: SelectProps & AdditionalProps): SelectElement => {

  const getInitialSelectedOption = (): SelectOption => {
    const { multiSelect, preselectedItem } = props;

    if (multiSelect) {
      return preselectedItem ? preselectedItem : [];
    } else {
      return preselectedItem ? preselectedItem : null;
    }
  };

  const [selectedOption, setSelectedOption] = React.useState(getInitialSelectedOption());

  return (
    <Select
      {...props}
      style={styles.select}
      selectedOption={selectedOption}
      onSelect={setSelectedOption}
    />
  );
};

const styles = StyleSheet.create({
  select: {
    width: 200,
  },
});
