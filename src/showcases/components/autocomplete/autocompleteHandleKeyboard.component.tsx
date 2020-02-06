import React from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import { Autocomplete, Layout } from '@ui-kitten/components';

const DATA = [
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

export const AutocompleteHandleKeyboardShowcase = () => {

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(DATA);
  const [placement, setPlacement] = React.useState('bottom');

  React.useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(showEvent, () => {
      setPlacement('top');
    });

    const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
      setPlacement('bottom');
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  });

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
        placeholder='Place your Text'
        value={value}
        data={data}
        placement={placement}
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
