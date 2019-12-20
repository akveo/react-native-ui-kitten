import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Autocomplete,
  AutocompleteElement,
  AutocompleteProps,
  AutocompleteOption,
} from '@ui-kitten/components';

export const AutocompleteShowcase = (props: AutocompleteProps): AutocompleteElement => {

  const [value, setValue] = React.useState(props.value);
  const [data, setData] = React.useState(props.data);

  const onSelect = ({ title }: AutocompleteOption): void => {
    setValue(title);
  };

  const onChangeText = (query: string): void => {
    const visibleData = props.data.filter((item) => {
      return item.title.toLowerCase().includes(query.toLowerCase());
    });

    setValue(query);
    setData(visibleData);
  };

  return (
    <Autocomplete
      {...props}
      style={styles.autocomplete}
      value={value}
      data={data}
      onChangeText={onChangeText}
      onSelect={onSelect}
    />
  );
};

const styles = StyleSheet.create({
  autocomplete: {
    flex: 1,
  },
});
