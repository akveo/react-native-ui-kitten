import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

const movies = [
  { title: 'Star Wars' },
  { title: 'Back to the Future' },
  { title: 'The Matrix' },
  { title: 'Inception' },
  { title: 'Interstellar' },
];

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

export const AutocompleteAccessoriesShowcase = () => {

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);

  const onSelect = (index) => {
    setValue(data[index].title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(movies.filter(item => filter(item, query)));
  };

  const clearInput = () => {
    setValue('');
    setData(movies);
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
      accessoryLeft={StarIcon}
    />
  );

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name='close'/>
    </TouchableWithoutFeedback>
  );

  return (
    <Autocomplete
      placeholder='Place your Text'
      value={value}
      accessoryRight={renderCloseIcon}
      onChangeText={onChangeText}
      onSelect={onSelect}>
      {data.map(renderOption)}
    </Autocomplete>
  );
};

