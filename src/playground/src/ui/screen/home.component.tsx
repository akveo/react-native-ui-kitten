import React from 'react';
import {
  ListRenderItemInfo,
  Platform,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Link } from '@react-navigation/web';
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
  { name: 'Calendar' },
  { name: 'Range Calendar' },
  { name: 'Checkbox' },
  { name: 'Datepicker' },
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

type Props = ThemedComponentProps & NavigationScreenProps;

class HomeScreen extends React.Component<Props> {

  private onItemPressMobile = (index: number) => {
    const { [index]: route } = routes;

    this.props.navigation.navigate(route.name);
  };

  private renderWebListItem = (info: ListRenderItemInfo<RouteType>): ListItemElement => {
    return (
      <Link routeName={info.item.name}>
        <ListItem title={info.item.name}/>
      </Link>
    );
  };

  private renderMobileListItem = (info: ListRenderItemInfo<RouteType>): ListItemElement => {
    return (
      <ListItem
        title={info.item.name}
        onPress={this.onItemPressMobile}
      />
    );
  };

  private renderItem = (info: ListRenderItemInfo<RouteType>): ListItemElement => {
    return Platform.select({
      ios: this.renderMobileListItem(info),
      android: this.renderMobileListItem(info),
      default: this.renderWebListItem(info),
    });
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
