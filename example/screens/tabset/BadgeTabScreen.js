import React from 'react';
import { View } from 'react-native';
import {
  RkTabSet,
  RkTab,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { TabContentScreen } from './TabContentScreen';

export class BadgeTabScreen extends React.Component {
  static navigationOptions = {
    title: 'Badge Tabs',
  };

  render() {
    return (
      <View style={styles.container}>
        <RkTabSet style={styles.container}>
          <RkTab title='Calls'>
            <TabContentScreen style={styles.tabContent1} />
          </RkTab>
          <RkTab title='Contacts'>
            <TabContentScreen style={styles.tabContent2} />
          </RkTab>
          <RkTab
            title='Favorites'
            badgeTitle='new'>
            <TabContentScreen
              style={styles.tabContent3}
              message='Tab 2 loves React Native UI Kitten'
            />
          </RkTab>
        </RkTabSet>
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
