import React, { useCallback } from 'react';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';

const movies = [
  { title: 'Star Wars' },
  { title: 'Back to the Future' },
  { title: 'The Matrix' },
  { title: 'Inception' },
  { title: 'Interstellar' },
];

const filter = (item, query): boolean => item.title.toLowerCase().includes(query.toLowerCase());

export const AutocompleteSimpleUsageShowcase = (): React.ReactElement => {

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);

  const onSelect = useCallback((index): void => {
    setValue(data[index].title);
  }, [data]);

  const onChangeText = useCallback((query): void => {
    setValue(query);
    setData(movies.filter(item => filter(item, query)));
  }, []);

  const renderOption = (item, index): React.ReactElement => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  return (
    <Autocomplete
      placeholder='Place your Text'
      value={value}
      placement='inner top'
      onSelect={onSelect}
      onChangeText={onChangeText}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};
