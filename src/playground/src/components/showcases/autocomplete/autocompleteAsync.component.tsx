import React from 'react';
import { StyleSheet } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {
  Autocomplete,
  Layout,
} from '@ui-kitten/components';

const requestData = () => fetch(`https://facebook.github.io/react-native/movies.json`);
const requestDataWithDebounce = AwesomeDebouncePromise(requestData, 400);

export const AutocompleteAsyncShowcase = () => {

  const [query, setQuery] = React.useState(null);
  const [data, setData] = React.useState(null);

  const updateData = () => {
    requestDataWithDebounce()
      .then(response => response.json())
      .then(json => json.movies)
      .then(applyFilter)
      .then(setData);
  };

  React.useEffect(updateData, [query]);

  const onSelect = ({ title }) => {
    setQuery(title);
  };

  const applyFilter = (options) => {
    // can be avoided if filtration is done on server
    return options.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <Layout style={styles.container}>
      <Autocomplete
        placeholder='Start typing to fetch options'
        value={query}
        data={data}
        onChangeText={setQuery}
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
