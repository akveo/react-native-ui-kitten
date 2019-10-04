import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import {
  List,
  ListElement,
  ListItem,
  ListItemElement,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten';
import { RouteType } from '../../navigation';

export const routes: RouteType[] = [
  { name: 'Avatar' },
  { name: 'Bottom Navigation' },
  { name: 'Button' },
  { name: 'Button Group' },
  { name: 'Calendar' },
  { name: 'Range Calendar' },
  { name: 'Checkbox' },
  { name: 'Datepicker'},
  { name: 'Drawer' },
  { name: 'Icon' },
  { name: 'Input' },
  { name: 'Layout' },
  { name: 'List' },
  { name: 'Menu' },
  { name: 'Modal' },
  { name: 'Overflow Menu' },
  { name: 'Popover' },
  { name: 'Radio' },
  { name: 'Radio Group' },
  { name: 'Select' },
  { name: 'Spinner' },
  { name: 'Tab View' },
  { name: 'Text' },
  { name: 'Toggle' },
  { name: 'Tooltip' },
  { name: 'Top Navigation' },
  { name: 'Sample' },
];

type Props = ThemedComponentProps & NavigationStackScreenProps;

class HomeScreen extends React.Component<Props> {

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
