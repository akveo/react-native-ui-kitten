import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  List,
  ListItem,
  Spinner,
} from 'react-native-ui-kitten';

const SAMPLE_DATA = {
  title: 'Title for Item',
};

export class SpinnerDataLoadingShowcase extends React.Component {

  state = {
    data: [],
  };

  componentDidMount() {
    setTimeout(this.loadData, 5000);
  }

  loadData = () => {
    const data = new Array(8).fill(SAMPLE_DATA);
    this.setState({ data });
  };

  private renderLoading = () => (
    <View style={styles.loading}>
      <Spinner/>
    </View>
  );

  renderDataItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`}/>
  );

  renderData = () => (
    <List
      data={this.state.data}
      renderItem={this.renderDataItem}
    />
  );

  render() {
    const isLoaded: boolean = this.state.data.length > 0;
    return isLoaded ? this.renderData() : this.renderLoading();
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
