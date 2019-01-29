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
import { ViewPager as ViewPagerComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  selectedIndex: number;
}

class ViewPager extends React.Component<Props, State> {

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
      <ViewPagerComponent
        selectedIndex={this.state.selectedIndex}
        contentWidth={Dimensions.get('window').width}
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
      </ViewPagerComponent>
    );
  }
}

export const ViewPagerScreen = withStyles(ViewPager, (theme: ThemeType) => ({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


