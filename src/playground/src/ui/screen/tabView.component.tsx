import React from 'react';
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

  render() {
    return (
      <TabViewComponent
        style={this.props.themedStyle.container}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}>
        <TabComponent title='❤️'>Tab 1</TabComponent>
        <TabComponent title='💛️'>Tab 2</TabComponent>
        <TabComponent title='💚️'>Tab 3</TabComponent>
      </TabViewComponent>
    );
  }
}

export const TabViewScreen = withStyles(TabView, () => ({
  container: {
    flex: 1,
  },
}));


