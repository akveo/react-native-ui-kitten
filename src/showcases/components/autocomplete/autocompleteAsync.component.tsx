import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';

const requestData = () => fetch('https://reactnative.dev/movies.json');
const requestDataWithDebounce = AwesomeDebouncePromise(requestData, 400);

export const AutocompleteAsyncShowcase = () => {

  const [query, setQuery] = React.useState(null);
  const [data, setData] = React.useState([]);

  const updateData = () => {
    requestDataWithDebounce()
      .then(response => response.json())
      .then(json => json.movies)
      .then(applyFilter)
      .then(setData);
  };

  React.useEffect(updateData, [query]);

  const onSelect = (index: number) => {
    setQuery(data[index].title);
  };

  const onChangeText = (nextQuery) => {
    setQuery(nextQuery);
  };

  const applyFilter = (options) => {
    return options.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  return (
    <Autocomplete
      placeholder='For example, Star Wars'
      value={query}
      onChangeText={onChangeText}
      onSelect={onSelect}>
      {data.map(renderOption)}
    </Autocomplete>
  );
};
