import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Autocomplete,
  Layout,
} from '@ui-kitten/components';

const DATA = [
  {
    id: 1,
    title: 'Star Wars',
    releaseYear: 1977,
  },
  {
    id: 2,
    title: 'Back to the Future',
    releaseYear: 1985,
  },
  {
    id: 3,
    title: 'The Matrix',
    releaseYear: 1999,
  },
  {
    id: 4,
    title: 'Inception',
    releaseYear: 2010,
  },
  {
    id: 5,
    title: 'Interstellar',
    releaseYear: 2014,
  },
];

const useAutocompleteChanges = (initialProps) => {
  const [value, setValue] = React.useState(initialProps.value);
  const [data, setData] = React.useState(initialProps.data);

  const onSelect = ({ title }) => {
    setValue(title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
  };

  return {
    value,
    data,
    onSelect,
    onChangeText,
  };
};

export const AutocompleteSizeShowcase = () => {

  const smallAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });
  const mediumAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });
  const largeAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });

  return (
    <Layout>

      <Autocomplete
        style={styles.autocomplete}
        size='small'
        placeholder='Small'
        {...smallAutocompleteChanges}
      />

      <Autocomplete
        style={styles.autocomplete}
        size='medium'
        placeholder='Medium'
        {...mediumAutocompleteChanges}
      />

      <Autocomplete
        style={styles.autocomplete}
        size='large'
        placeholder='Large'
        {...largeAutocompleteChanges}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  autocomplete: {
    margin: 8,
  },
});

