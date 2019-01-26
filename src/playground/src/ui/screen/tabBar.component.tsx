import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemedComponentProps,
  ThemeType,
} from '@kitten/theme';
import {
  Tab as TabComponent,
  TabBar as TabBarComponent,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  bar1SelectedIndex: number;
  bar2SelectedIndex: number;
}

class TabBar extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Tab Bar',
  };

  public state: State = {
    bar1SelectedIndex: 0,
    bar2SelectedIndex: 1,
  };

  private onBar1Select = (index: number) => {
    this.setState({
      bar1SelectedIndex: index,
    });
  };

  private onBar2Select = (index: number) => {
    this.setState({
      bar2SelectedIndex: index,
    });
  };

  private createCustomTabStyle = (index: number) => ({
    ...this.props.themedStyle.customTab,
    backgroundColor: index === this.state.bar2SelectedIndex ? 'black' : 'transparent',
  });

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Default</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <TabBarComponent
              onSelect={this.onBar1Select}
              selectedIndex={this.state.bar1SelectedIndex}>
              <TabComponent title='❤️'/>
              <TabComponent title='💛️'/>
              <TabComponent title='💚️'/>
            </TabBarComponent>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Custom</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <TabBarComponent
              style={this.props.themedStyle.customBar}
              onSelect={this.onBar2Select}
              selectedIndex={this.state.bar2SelectedIndex}>
              <TabComponent
                style={this.createCustomTabStyle(0)}
                title='❤️'/>
              <TabComponent
                style={this.createCustomTabStyle(1)}
                title='💛️'/>
              <TabComponent
                style={this.createCustomTabStyle(2)}
                title='💚️'/>
            </TabBarComponent>
          </View>
        </View>
      </View>
    );
  }
}

export const TabBarScreen = withStyles(TabBar, (theme: ThemeType) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  containerSection: {
    marginVertical: 16,
  },
  containerPreview: {
    paddingVertical: 8,
  },
  textDescription: {
    fontSize: 18,
  },
  customBar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRadius: 4,
    marginBottom: 2,
    borderColor: 'black',
  },
  customTab: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'black',
  },
}));


