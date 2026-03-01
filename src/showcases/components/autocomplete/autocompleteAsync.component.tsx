import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';

const requestData = (): Promise<Response> => fetch('https://reactnative.dev/movies.json');
const requestDataWithDebounce = AwesomeDebouncePromise(requestData, 400);

export const AutocompleteAsyncShowcase = (): React.ReactElement => {
  const autocompleteRef = React.useRef(null);
  const [query, setQuery] = React.useState(null);
  const [data, setData] = React.useState([]);

  const updateData = (): void => {
    void requestDataWithDebounce()
      .then(response => response.json())
      .then(json => json.movies)
      .then(applyFilter)
      .then(setData);
  };

  React.useEffect(updateData, [query]);

  const onSelect = (index: number): void => {
    setQuery(data[index].title);
  };

  const onChangeText = (nextQuery): void => {
    setQuery(nextQuery);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applyFilter = (options): any => {
    return options.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  };

  const renderOption = (item, index): React.ReactElement => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  return (
    <Autocomplete
      ref={autocompleteRef}
      placeholder='For example, Star Wars'
      value={query}
      placement='inner top'
      onChangeText={onChangeText}
      onSelect={onSelect}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};
