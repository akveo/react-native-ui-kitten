/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Autocomplete,
  Icon,
  Layout,
} from '@ui-kitten/components';

const CloseIcon = (style) => (
  <Icon {...style} name='close'/>
);

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

export const AutocompleteWithIconShowcase = () => {

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(DATA);

  const onSelect = ({ title }) => {
    setValue(title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
  };

  const clearInput = () => {
    setValue('');
    setData(DATA);
  };

  return (
    <Layout style={styles.container}>
      <Autocomplete
        placeholder='Place your Text'
        value={value}
        data={data}
        icon={CloseIcon}
        onIconPress={clearInput}
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

