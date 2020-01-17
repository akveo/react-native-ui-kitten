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

export const AutocompleteStatesShowcase = () => {

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(DATA);

  const onChangeText = (query) => {
    setValue(query);
    setData(DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
  };

  const onSelect = ({ title }) => {
    setValue(title);
  };

  return (
    <Layout style={styles.container}>

      <Autocomplete
        style={styles.autocomplete}
        placeholder='Active'
        value={value}
        data={data}
        onChangeText={onChangeText}
        onSelect={onSelect}
      />

      <Autocomplete
        style={styles.autocomplete}
        disabled={true}
        placeholder='Disabled'
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 228,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  autocomplete: {
    width: 192,
    margin: 8,
  },
});
