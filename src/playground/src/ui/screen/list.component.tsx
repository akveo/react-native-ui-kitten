import React from 'react';
import {
  Alert,
  GestureResponderEvent,
  ListRenderItemInfo,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps } from '@kitten/theme';
import {
  List,
  // ListItem,
  ListItemProps,
} from '@kitten/ui';
import { ListItemIconAccessoryShowcase as ListItem } from './listItem.showcase.component';

interface ListItemModel {
  title: string;
  description: string;
}

type Props = & ThemedComponentProps & NavigationScreenProps;

class ListScreen extends React.Component<Props> {

  static navigationOptions = {
    title: 'List',
  };

  private items: ListItemModel[] = new Array(42).fill({
    title: `Item`,
    description: [
      'Once upon a time when pigs spoke rhyme',
      'and monkeys chewed tobacco,',
      'and hens took snuff to make them tough,',
      'and ducks went quack, quack, quack, O!',
    ].join(' '),
  });

  private onItemPress = (event: GestureResponderEvent, index: number) => {
    const { title, description } = this.items[index];

    Alert.alert(`${title} ${index + 1} says`, `${description}`);
  };

  private renderItem = (info: ListRenderItemInfo<ListItemModel>): React.ReactElement<ListItemProps> => {
    const { item, index } = info;

    return (
      <ListItem
        title={`${item.title} ${index + 1}`}
        description={item.description}
        onPress={this.onItemPress}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <List
        data={this.items}
        renderItem={this.renderItem}
      />
    );
  }
}

export default ListScreen;
