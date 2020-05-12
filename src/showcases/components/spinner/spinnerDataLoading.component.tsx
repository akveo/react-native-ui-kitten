import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem, Spinner } from '@ui-kitten/components';

const DATA = new Array(8).fill({
  title: 'Title for Item',
});

export const SpinnerDataLoadingShowcase = () => {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setTimeout(loadData, 5000);
  }, []);

  const loadData = () => {
    setData(DATA);
  };

  const renderLoading = () => (
    <View style={styles.loading}>
      <Spinner/>
    </View>
  );

  const renderDataItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`}/>
  );

  const renderData = () => (
    <List
      data={data}
      renderItem={renderDataItem}
    />
  );

  return data.length > 0 ? renderData() : renderLoading();
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
