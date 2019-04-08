import React from 'react';
import {
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemedComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  TabView,
  Tab,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const ICON1: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };
const ICON2: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/email.png' };
const ICON3: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/info.png' };

interface State {
  selectedIndex: number;
}

class TabViewScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Tab View',
  };

  public state: State = {
    selectedIndex: 0,
  };

  private onSelect = (selectedIndex: number) => {
    this.setState({ selectedIndex });
  };

  public render(): React.ReactNode {
    return (
      <TabView
        style={this.props.themedStyle.container}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}>
        <Tab
          title='TAB 1'
          icon={(style: StyleType) => <Image source={ICON1} style={style}/>}>
          <Text>Tab 1</Text>
        </Tab>
        <Tab
          title='TAB 2'
          icon={(style: StyleType) => <Image source={ICON2} style={style}/>}>
          <Text>Tab 2</Text>
        </Tab>
        <Tab
          title='TAB 3'
          icon={(style: StyleType) => <Image source={ICON3} style={style}/>}>
          <Text>Tab 3</Text>
        </Tab>
      </TabView>
    );
  }
}

export default withStyles(TabViewScreen, () => ({
  container: {
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
}));


