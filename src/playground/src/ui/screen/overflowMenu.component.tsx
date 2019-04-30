import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  GestureResponderEvent,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  OverflowMenu,
  OverflowMenuItemType,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  overflowMenu1Visible: boolean;
  overflowMenu2Visible: boolean;
  overflowMenu3Visible: boolean;
  overflowMenu4Visible: boolean;
}

const iconUri1: string = 'https://akveo.github.io/eva-icons/fill/png/128/star.png';
const iconUri2: string = 'https://akveo.github.io/eva-icons/fill/png/128/alert-triangle.png';
const iconUri3: string = 'https://akveo.github.io/eva-icons/fill/png/128/book-open.png';
const menuIconUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/menu.png';

const menuItems: OverflowMenuItemType[] = [
  {
    text: 'Menu Item 1',
    textStyle: { fontSize: 24, color: 'blue' },
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

class OverflowMenuScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Overflow Menu',
  };

  public state: State = {
    overflowMenu1Visible: false,
    overflowMenu2Visible: false,
    overflowMenu3Visible: false,
    overflowMenu4Visible: false,
  };

  private setMenu1Visible = (): void => {
    this.setState({ overflowMenu1Visible: !this.state.overflowMenu1Visible });
  };

  private setMenu2Visible = (): void => {
    this.setState({ overflowMenu2Visible: !this.state.overflowMenu2Visible });
  };

  private setMenu3Visible = (): void => {
    this.setState({ overflowMenu3Visible: !this.state.overflowMenu3Visible });
  };

  private setMenu4Visible = (): void => {
    this.setState({ overflowMenu4Visible: !this.state.overflowMenu4Visible });
  };

  private onSelectItem = (index: number, event: GestureResponderEvent): void => {
    Alert.alert(`Selected item\'s index: ${index}`);
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.innerContainer}>
          <OverflowMenu
            items={menuItems}
            placement='bottom start'
            visible={this.state.overflowMenu1Visible}
            style={this.props.themedStyle.menu}
            onSelect={this.onSelectItem}
            onRequestClose={this.setMenu1Visible}>
            <TouchableOpacity
              onPress={this.setMenu1Visible}
              style={this.props.themedStyle.menuContainer}>
              <Image style={this.props.themedStyle.menuIcon} source={{ uri: menuIconUri }}/>
            </TouchableOpacity>
          </OverflowMenu>
          <OverflowMenu
            items={menuItems}
            placement='bottom end'
            size='small'
            visible={this.state.overflowMenu2Visible}
            style={this.props.themedStyle.menu}
            onSelect={this.onSelectItem}
            onRequestClose={this.setMenu2Visible}>
            <TouchableOpacity
              onPress={this.setMenu2Visible}
              style={this.props.themedStyle.menuContainer}>
              <Image style={this.props.themedStyle.menuIcon} source={{ uri: menuIconUri }}/>
            </TouchableOpacity>
          </OverflowMenu>
        </View>
        <View style={[this.props.themedStyle.innerContainer, this.props.themedStyle.bottomContainer]}>
          <OverflowMenu
            items={menuItems}
            placement='top start'
            size='large'
            visible={this.state.overflowMenu3Visible}
            style={this.props.themedStyle.menu}
            onSelect={this.onSelectItem}
            onRequestClose={this.setMenu3Visible}>
            <TouchableOpacity
              onPress={this.setMenu3Visible}
              style={this.props.themedStyle.menuContainer}>
              <Image style={this.props.themedStyle.menuIcon} source={{ uri: menuIconUri }}/>
            </TouchableOpacity>
          </OverflowMenu>
          <OverflowMenu
            items={menuItems}
            placement='top end'
            visible={this.state.overflowMenu4Visible}
            style={this.props.themedStyle.menu}
            onSelect={this.onSelectItem}
            onRequestClose={this.setMenu4Visible}>
            <TouchableOpacity
              onPress={this.setMenu4Visible}
              style={this.props.themedStyle.menuContainer}>
              <Image style={this.props.themedStyle.menuIcon} source={{ uri: menuIconUri }}/>
            </TouchableOpacity>
          </OverflowMenu>
        </View>
      </View>
    );
  }
}

export default withStyles(OverflowMenuScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#DDE1EB',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    alignItems: 'flex-end',
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
    alignSelf: 'flex-start',
  },
}));

