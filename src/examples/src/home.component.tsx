import React from 'react';
import {
  List,
  ListItem,
  ListItemElement,
} from 'react-native-ui-kitten';
import { NavigationScreenProps } from 'react-navigation';
import { Link } from '@react-navigation/web';
import { ListRenderItemInfo } from 'react-native';

export const routes: any[] = [
  { name: 'ButtonSimpleUsage' },
  { name: 'ButtonStatus' },
  { name: 'ButtonSize' },
  { name: 'CheckboxSimpleUsage' },
  { name: 'CheckboxStatus' },
];

export class HomeComponent extends  React.Component<NavigationScreenProps> {

  private onItemPress = (index: number) => {
    // const { [index]: route } = routes;
    //
    // this.props.navigation.navigate(route.name);
  };

  private renderItem = (info: ListRenderItemInfo<any>): ListItemElement => {
    return (
      <Link routeName={info.item.name}>
        <ListItem
          title={info.item.name}
          onPress={this.onItemPress}
        />
      </Link>
    );
  };

  public render(): React.ReactNode {
    return (
      <List
        data={routes}
        renderItem={this.renderItem}
      />
    );
  }
}
