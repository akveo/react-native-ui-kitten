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
  TabBar,
  Tab,
} from '@kitten/ui';
import { ThemeConsumer } from '../themeConsumer';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  bar1SelectedIndex: number;
  bar2SelectedIndex: number;
}

class TabBarScreen extends React.Component<Props, State> {

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
      <ThemeConsumer>
        <View style={this.props.themedStyle.container}>
          <View style={this.props.themedStyle.containerSection}>
            <Text style={this.props.themedStyle.textDescription}>Default</Text>
            <View style={this.props.themedStyle.containerPreview}>
              <TabBar
                onSelect={this.onBar1Select}
                selectedIndex={this.state.bar1SelectedIndex}>
                <Tab title='❤️'/>
                <Tab title='💛️'/>
                <Tab title='💚️'/>
              </TabBar>
            </View>
          </View>
          <View style={this.props.themedStyle.containerSection}>
            <Text style={this.props.themedStyle.textDescription}>Custom</Text>
            <View style={this.props.themedStyle.containerPreview}>
              <TabBar
                style={this.props.themedStyle.customBar}
                onSelect={this.onBar2Select}
                selectedIndex={this.state.bar2SelectedIndex}>
                <Tab
                  style={this.createCustomTabStyle(0)}
                  title='❤️'/>
                <Tab
                  style={this.createCustomTabStyle(1)}
                  title='💛️'/>
                <Tab
                  style={this.createCustomTabStyle(2)}
                  title='💚️'/>
              </TabBar>
            </View>
          </View>
        </View>
      </ThemeConsumer>
    );
  }
}

export default withStyles(TabBarScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-color-default-1'],
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


