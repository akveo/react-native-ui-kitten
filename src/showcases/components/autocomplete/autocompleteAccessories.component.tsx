import React, { useCallback } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Autocomplete, AutocompleteItem, Icon, IconElement } from '@ui-kitten/components';

const movies = [
  { title: 'Star Wars' },
  { title: 'Back to the Future' },
  { title: 'The Matrix' },
  { title: 'Inception' },
  { title: 'Interstellar' },
];

const filter = (item, query): boolean => item.title.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props): IconElement => (
  <Icon
    {...props}
    name='star'
  />
);

export const AutocompleteAccessoriesShowcase = (): React.ReactElement => {

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);

  const onSelect = useCallback((index): void => {
    setValue(data[index].title);
  }, [data]);

  const onChangeText = useCallback((query) => {
    setValue(query);
    setData(movies.filter(item => filter(item, query)));
  }, []);

  const clearInput = (): void => {
    setValue('');
    setData(movies);
  };

  const renderOption = (item, index): React.ReactElement => (
    <AutocompleteItem
      key={index}
      title={item.title}
      accessoryLeft={StarIcon}
    />
  );

  const renderCloseIcon = (props): React.ReactElement => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon
        {...props}
        name='close'
      />
    </TouchableWithoutFeedback>
  );

  return (
    <Autocomplete
      placeholder='Place your Text'
      value={value}
      placement='inner top'
      accessoryRight={renderCloseIcon}
      onChangeText={onChangeText}
      onSelect={onSelect}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};

