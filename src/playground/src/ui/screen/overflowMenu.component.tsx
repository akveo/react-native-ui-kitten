import React from 'react';
import {
  ImageSourcePropType,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  OverflowMenu as OverflowMenuComponent,
  OverflowMenuItemType,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  overflowMenu1Visible: boolean;
  overflowMenu2Visible: boolean;
  overflowMenu3Visible: boolean;
}

const iconUri1: string = 'https://akveo.github.io/eva-icons/fill/png/128/star.png';
const iconUri2: string = 'https://akveo.github.io/eva-icons/fill/png/128/alert-triangle.png';
const iconUri3: string = 'https://akveo.github.io/eva-icons/fill/png/128/book-open.png';
const menuIconUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/menu.png';

const menu1Items: OverflowMenuItemType[] = [
  {
    text: 'Menu Item 1',
    icon: (style: StyleType) => <Image source={{ uri: iconUri1 }} style={style}/>,
  },
  {
    text: 'Menu Item 2',
    icon: (style: StyleType) => <Image source={{ uri: iconUri2 }} style={style}/>,
    disabled: true,
  },
  {
    text: 'Menu Item 3',
  },
  {
    text: 'Menu Item 4',
    icon: (style: StyleType) => <Image source={{ uri: iconUri3 }} style={style}/>,
  },
];

class OverflowMenu extends React.Component<Props, State> {


  static navigationOptions = {
    title: 'Overflow Menu',
  };

  public state: State = {
    overflowMenu1Visible: false,
    overflowMenu2Visible: false,
    overflowMenu3Visible: false,
  };

  private setMenu1Visible = (): void => {
    this.setState({ overflowMenu1Visible: !this.state.overflowMenu1Visible });
  };

  private onSelectItem = (index: number): void => {
    console.log('Selected item\'s index: ', index);
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <Button title={'Show menu'} onPress={this.setMenu1Visible}/>
        <OverflowMenuComponent
          items={menu1Items}
          placement='bottom end'
          visible={this.state.overflowMenu1Visible}
          style={this.props.themedStyle.menu}
          onSelect={(index: number) => this.onSelectItem(index)}
          onRequestClose={this.setMenu1Visible}
        >
          <TouchableOpacity
            onPress={this.setMenu1Visible}
            style={this.props.themedStyle.menuContainer}>
            <Image style={this.props.themedStyle.menuIcon} source={{ uri: menuIconUri }}/>
          </TouchableOpacity>
        </OverflowMenuComponent>
      </View>
    );
  }
}

export const OverflowMenuScreen = withStyles(OverflowMenu, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#DDE1EB',
  },
  menu: {
    width: 300,
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: '#3366FF',
  },
  menuContainer: {
    alignItems: 'flex-end',
  },
}));

