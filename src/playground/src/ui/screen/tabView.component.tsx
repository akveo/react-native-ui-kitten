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
} from '@kitten/theme';
import {
  Tab as TabComponent,
  TabView as TabViewComponent,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const ICON1: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };
const ICON2: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/email.png' };
const ICON3: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/info.png' };

interface State {
  selectedIndex: number;
}

class TabView extends React.Component<Props, State> {

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
      <TabViewComponent
        style={this.props.themedStyle.container}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}>
        <TabComponent
          title='Tab 1'
          icon={(width: number, height: number, color: string) =>
            (<Image source={ICON1} style={{
              width: width,
              height: height,
              tintColor: color,
              ...this.props.themedStyle.icon,
            }}/>)}>
          <Text>Tab 1</Text>
        </TabComponent>
        <TabComponent
          title='Tab 2'
          icon={(width: number, height: number, color: string) =>
            (<Image source={ICON2} style={{
              width: width,
              height: height,
              tintColor: color,
            }}/>)}>
          <Text>Tab 2</Text>
        </TabComponent>
        <TabComponent
          title='Tab 3'
          icon={(width: number, height: number, color: string) =>
            (<Image source={ICON1} style={{
              width: width,
              height: height,
              tintColor: color,
            }}/>)}>
          <Text>Tab 3</Text>
        </TabComponent>
      </TabViewComponent>
    );
  }
}

export const TabViewScreen = withStyles(TabView, () => ({
  container: {
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
}));


