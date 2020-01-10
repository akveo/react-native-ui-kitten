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

const PLACEHOLDER_DATA = [
  { title: 'No Results 🙀' },
];

export const AutocompletePlaceholderDataShowcase = () => {

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(DATA);

  const onSelect = ({ title }) => {
    setValue(title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
  };

  return (
    <Layout style={styles.container}>
      <Autocomplete
        placeholder='Place wrong Text'
        value={value}
        data={data}
        placeholderData={PLACEHOLDER_DATA}
        onChangeText={onChangeText}
        onSelect={onSelect}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 228,
  },
});

