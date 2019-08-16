import React from 'react';
import {
  View,
  StyleSheet,
  Text, ImageProps, Image,
} from 'react-native';
import {
  Menu,
  MenuItemProps,
  MenuItemType,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';

interface State {
  selectedIndex: number;
}

export class MenuContainer extends React.Component<any, State> {

  public state: State = {
    selectedIndex: null,
  };

  private Icon = (style: StyleType): React.ReactElement<ImageProps> => (
    <Image
      style={style}
      source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
    />
  );

  private menuItems: MenuItemType[] = [
    {
      title: 'Item 1',
      icon: this.Icon,
    },
    {
      title: 'Item 2',
      icon: this.Icon,
      disabled: true,
    },
    {
      // title: 'Item 3',
      icon: this.Icon,
    },
    {
      title: 'Item 4',
      // icon: this.Icon,
    },
    {
      title: 'Item 5',
      icon: this.Icon,
    },
  ];

  private onSelect = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  };

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Menu
          appearance='divider'
          data={this.menuItems}
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
