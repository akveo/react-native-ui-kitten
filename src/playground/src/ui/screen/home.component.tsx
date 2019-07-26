import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  List,
  ListElement,
  ListItem,
  ListItemElement,
} from '@kitten/ui';
import { RouteType } from '../../navigation';

export const routes: RouteType[] = [
  { name: 'Avatar' },
  { name: 'Bottom Navigation' },
  { name: 'Button' },
  { name: 'Button Group' },
  { name: 'Checkbox' },
  { name: 'Input' },
  { name: 'Layout' },
  { name: 'List' },
  { name: 'Modal' },
  { name: 'Popover' },
  { name: 'Radio' },
  { name: 'Radio Group' },
  { name: 'Spinner' },
  { name: 'Tab View' },
  { name: 'Tooltip' },
  { name: 'Text' },
  { name: 'Toggle' },
  { name: 'Top Navigation' },
  { name: 'Overflow Menu' },
  { name: 'Sample' },
];

type Props = ThemedComponentProps & NavigationScreenProps;

class HomeScreen extends React.Component<Props> {

  static navigationOptions = {
    title: 'Home',
  };

  private onItemPress = (index: number) => {
    const { [index]: route } = routes;

    this.props.navigation.navigate(route.name);
  };

  private renderItem = (info: ListRenderItemInfo<RouteType>): ListItemElement => {
    return (
      <ListItem
        title={info.item.name}
        onPress={this.onItemPress}
      />
    );
  };

  public render(): ListElement {
    return (
      <List
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
    backgroundColor: theme['background-basic-color-1'],
  },
}));
