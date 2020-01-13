import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Autocomplete,
  Avatar,
  Layout,
  Text,
} from '@ui-kitten/components';

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

export const AutocompleteCustomItemShowcase = () => {

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(DATA);

  const onSelect = ({ title }) => {
    setValue(title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
  };

  const renderItem = ({ item }) => (
    <React.Fragment>
      <Avatar size='small' source={require('../../assets/icon.png')}/>
      <View style={{ marginHorizontal: 8 }}>
        <Text>{item.title}</Text>
        <Text appearance='hint' category='p2'>
          {`${item.releaseYear}`}
        </Text>
      </View>
    </React.Fragment>
  );

  return (
    <Layout style={styles.container}>
      <Autocomplete
        placeholder='Place your Text'
        value={value}
        data={data}
        renderItem={renderItem}
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
