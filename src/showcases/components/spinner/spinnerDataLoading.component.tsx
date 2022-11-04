import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem, Spinner } from '@ui-kitten/components';

interface IListItem {
  title: string;
  description: string;
}

const DATA = new Array(8).fill({
  title: 'Title for Item',
});

export const SpinnerDataLoadingShowcase = (): React.ReactElement => {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setTimeout(loadData, 5000);
  }, []);

  const loadData = (): void => {
    setData(DATA);
  };

  const renderLoading = (): React.ReactElement => (
    <View style={styles.loading}>
      <Spinner />
    </View>
  );

  const renderDataItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
    <ListItem title={`${item.title} ${index + 1}`} />
  );

  const renderData = (): React.ReactElement => (
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
