import React, { useCallback } from 'react';
import { Keyboard, KeyboardEventName, Platform } from 'react-native';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';

const movies = [
  { title: 'Star Wars' },
  { title: 'Back to the Future' },
  { title: 'The Matrix' },
  { title: 'Inception' },
  { title: 'Interstellar' },
];

const showEvent = Platform.select({
  android: 'keyboardDidShow',
  default: 'keyboardWillShow',
});

const hideEvent = Platform.select({
  android: 'keyboardDidHide',
  default: 'keyboardWillHide',
});

const filter = (item, query): boolean => item.title.toLowerCase().includes(query.toLowerCase());

export const AutocompleteHandleKeyboardShowcase = (): React.ReactElement => {

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);
  const [placement, setPlacement] = React.useState('bottom');

  React.useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(showEvent as KeyboardEventName, () => {
      setPlacement('top');
    });

    const keyboardHideListener = Keyboard.addListener(hideEvent as KeyboardEventName, () => {
      setPlacement('bottom');
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  });

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
      placement={placement}
      onChangeText={onChangeText}
      onSelect={onSelect}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};
