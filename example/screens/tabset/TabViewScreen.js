import React from 'react';
import { View } from 'react-native';
import {
  RkTabView,
  RkTab,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { TabContentScreen } from './TabContentScreen';

export class TabViewScreen extends React.Component {
  static navigationOptions = {
    title: 'Tab Set',
  };

  render() {
    return (
      <View style={styles.container}>
        <RkTabView style={styles.container} onItemChange={this.onItemChange}>
          <RkTab title="Tab #1">
            <TabContentScreen style={styles.tabContent1} />
          </RkTab>
          <RkTab title="Tab #2" isSelected={true}>
            <TabContentScreen
              style={styles.tabContent2}
              message='Tab 2 loves React Native UI Kitten'
            />
          </RkTab>
          <RkTab title="Tab #3">
            <TabContentScreen style={styles.tabContent3} />
          </RkTab>
        </RkTabView>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tabContent1: {
    backgroundColor: 'red',
  },
  tabContent2: {
    backgroundColor: 'green',
  },
  tabContent3: {
    backgroundColor: 'blue',
  },
}));
