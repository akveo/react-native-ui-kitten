import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export class TabsScreen extends React.Component {
  static navigationOptions = {
    title: 'Tabs',
  };
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
  static data = [
    {
      title: 'Base',
      description: "'Minimum code' implementation",
      route: 'BaseTabs',
    },
    {
      title: 'Badge',
      description: 'Helps to keep your users tuned on content changes',
      route: 'BadgeTabs',
    },
    {
      title: 'Icon',
      description: 'For better UX',
      route: 'IconTabs',
    },
  ];

  getItemKey = (item, index) => index.toString();

  onItemClick = (item) => {
    this.props.navigation.navigate(item.route);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onItemClick(item)}>
      <View style={styles.componentRow}>
        <RkText rkType='header'>{item.title}</RkText>
        <RkText rkType='subtitle'>{item.description}</RkText>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <RkText>
          {'TabView is a component which allows you to split your content into sub-contents'}
        </RkText>
        <View style={styles.descriptionSeparator} />
        <FlatList
          data={TabsScreen.data}
          keyExtractor={this.getItemKey}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.screen.base,
  },
  descriptionSeparator: {
    height: 2,
    marginVertical: 8,
    backgroundColor: theme.colors.border.base,
  },
  componentRow: {
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
}));
