import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
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

export const AutocompleteStatusShowcase = () => {

  const primaryAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });
  const successAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });
  const infoAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });
  const warningAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });
  const dangerAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });
  const basicAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });
  const controlAutocompleteChanges = useAutocompleteChanges({
    value: null,
    data: DATA,
  });

  return (
    <Layout>

      <Autocomplete
        style={styles.autocomplete}
        status='primary'
        placeholder='Primary'
        {...primaryAutocompleteChanges}
      />

      <Autocomplete
        style={styles.autocomplete}
        status='success'
        placeholder='Success'
        {...successAutocompleteChanges}
      />

      <Autocomplete
        style={styles.autocomplete}
        status='info'
        placeholder='Info'
        {...infoAutocompleteChanges}
      />

      <Autocomplete
        style={styles.autocomplete}
        status='warning'
        placeholder='Warning'
        {...warningAutocompleteChanges}
      />

      <Autocomplete
        style={styles.autocomplete}
        status='danger'
        placeholder='Danger'
        {...dangerAutocompleteChanges}
      />

      <Autocomplete
        style={styles.autocomplete}
        status='basic'
        placeholder='Basic'
        {...basicAutocompleteChanges}
      />

      <View style={styles.controlContainer}>
        <Autocomplete
          style={styles.autocomplete}
          status='control'
          placeholder='Control'
          {...controlAutocompleteChanges}
        />
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  autocomplete: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});

