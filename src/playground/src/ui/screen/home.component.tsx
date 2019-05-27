import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { RouteType } from '../../navigation';

export const routes: RouteType[] = [
  { name: 'Avatar' },
  { name: 'Bottom Navigation' },
  { name: 'Button' },
  { name: 'Button Group' },
  { name: 'Checkbox' },
  { name: 'Dialog' },
  { name: 'Input' },
  { name: 'Layout' },
  { name: 'List' },
  { name: 'Popover' },
  { name: 'Radio' },
  { name: 'Radio Group' },
  { name: 'Tab Bar' },
  { name: 'Tab View' },
  { name: 'Tooltip' },
  { name: 'Text' },
  { name: 'Toggle' },
  { name: 'View Pager' },
  { name: 'Top Navigation' },
  { name: 'Modal' },
  { name: 'Overflow Menu' },
];

type Props = ThemedComponentProps & NavigationScreenProps;

class HomeScreen extends React.Component<Props> {

  static navigationOptions = {
    title: 'Home',
  };

  private onItemPress = (route: RouteType) => {
    this.props.navigation.navigate(route.name);
  };

  private extractItemKey = (item: RouteType, index: number): string => {
    return index.toString();
  };

  private renderItem = (info: ListRenderItemInfo<RouteType>): React.ReactElement<TouchableOpacityProps> => (
    <TouchableOpacity
      style={this.props.themedStyle.itemContainer}
      key={info.index}
      onPress={() => this.onItemPress(info.item)}>
      <Text style={this.props.themedStyle.itemText}>{info.item.name}</Text>
    </TouchableOpacity>
  );

  public render(): React.ReactNode {
    return (
      <FlatList
        keyExtractor={this.extractItemKey}
        style={this.props.themedStyle.container}
        data={routes}
        renderItem={this.renderItem}
      />
    );
  }
}

export default withStyles(HomeScreen, (theme: ThemeType) => ({
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
