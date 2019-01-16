import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  FlatList,
  Text,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import {
  NavigatorProps,
  RouteType,
} from '../../navigation';

type Props = NavigatorProps & ThemedComponentProps & NavigationScreenProps;

class Home extends React.Component<Props> {

  static navigationOptions = {
    title: 'Home',
  };

  onItemPress = (route: RouteType) => {
    this.props.navigation.navigate(route.name);
  };

  extractItemKey = (item: RouteType, index: number) => `${index}`;

  renderItem = (info: ListRenderItemInfo<any>) => (
    <TouchableOpacity
      style={this.props.themedStyle.itemContainer}
      key={info.index}
      onPress={() => this.onItemPress(info.item)}>
      <Text style={this.props.themedStyle.itemText}>{info.item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList
        keyExtractor={this.extractItemKey}
        style={this.props.themedStyle.container}
        data={this.props.routes}
        renderItem={this.renderItem}
      />
    );
  }
}

export const HomeScreen = withStyles(Home, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemContainer: {
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '500',
  },
}));
