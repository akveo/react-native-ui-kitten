import React from 'react';
import {
  Text,
  Image,
  ImageSourcePropType,
  ImageProps,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemedComponentProps,
  StyleType,
  ThemeType,
} from '@kitten/theme';
import {
  Tab,
  TabView,
} from '@kitten/ui';
import { ThemeConsumer } from '../themeConsumer';

type Props = & ThemedComponentProps & NavigationScreenProps;

const ICON: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

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

  private renderIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    return (
      <Image source={ICON} style={style}/>
    );
  };

  private shouldLoadTabContent = (index: number): boolean => {
    return index === this.state.selectedIndex;
  };

  public render(): React.ReactNode {
    return (
      <ThemeConsumer>
        <TabView
          style={this.props.themedStyle.container}
          selectedIndex={this.state.selectedIndex}
          shouldLoadComponent={this.shouldLoadTabContent}
          onSelect={this.onSelect}>
          <Tab
            title='TAB 1'
            icon={this.renderIcon}>
            <Text>Tab 1</Text>
          </Tab>
          <Tab
            title='TAB 2'
            icon={this.renderIcon}>
            <Text>Tab 2</Text>
          </Tab>
          <Tab
            title='TAB 3'
            icon={this.renderIcon}>
            <Text>Tab 3</Text>
          </Tab>
        </TabView>
      </ThemeConsumer>
    );
  }
}

export default withStyles(TabViewScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-color-default-1'],
  },
  icon: {
    width: 30,
    height: 30,
  },
}));


