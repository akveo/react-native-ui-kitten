import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Autocomplete, AutocompleteItem, Button, Text } from '@ui-kitten/components';

// #1755 / #1578: an Autocomplete beside a Button. The counters echo how many times the
// Autocomplete's `onBlur` fired and how many times the Button was pressed, so a device run can
// tell whether the first tap on the Button reaches it while the options list is open.

const movies = [
  { title: 'Star Wars' },
  { title: 'Back to the Future' },
  { title: 'The Matrix' },
  { title: 'Inception' },
  { title: 'Interstellar' },
];

const filter = (item, query): boolean => item.title.toLowerCase().includes(query.toLowerCase());

export const AutocompleteBlurShowcase = (): React.ReactElement => {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);
  const [blurs, setBlurs] = React.useState(0);
  const [presses, setPresses] = React.useState(0);

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
      testID={`autocomplete-blur-item-${index + 1}`}
      title={item.title}
    />
  );

  return (
    <>
      <Text testID='autocomplete-blur-value'>{`blurs: ${blurs}, presses: ${presses}`}</Text>
      <View style={styles.row}>
        <Autocomplete
          testID='autocomplete-blur'
          style={styles.field}
          placeholder='Type a movie'
          value={value}
          onSelect={onSelect}
          onChangeText={onChangeText}
          onBlur={() => setBlurs(count => count + 1)}
        >
          {data.map(renderOption)}
        </Autocomplete>
        <Button
          testID='autocomplete-blur-button'
          onPress={() => setPresses(count => count + 1)}
        >
          SUBMIT
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  field: {
    flex: 1,
    marginRight: 8,
  },
});
