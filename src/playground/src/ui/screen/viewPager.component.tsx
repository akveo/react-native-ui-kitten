import React from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemedComponentProps,
  ThemeType,
} from '@kitten/theme';
import { ViewPager } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  selectedIndex: number;
}

class ViewPagerScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'View Pager',
  };

  public state: State = {
    selectedIndex: 0,
  };

  private onIndexChange = (index: number) => {
    this.state.selectedIndex = index;
  };

  public render(): React.ReactNode {
    return (
      <ViewPager
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onIndexChange}>
        <View style={this.props.themedStyle.tabContainer}>
          <Text>Tab 1</Text>
        </View>
        <View style={this.props.themedStyle.tabContainer}>
          <Text>Tab 2</Text>
        </View>
        <View style={this.props.themedStyle.tabContainer}>
          <Text>Tab 3</Text>
        </View>
      </ViewPager>
    );
  }
}

export default withStyles(ViewPagerScreen, (theme: ThemeType) => ({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


