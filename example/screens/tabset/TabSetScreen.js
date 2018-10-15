import React from 'react';
import { View } from 'react-native';
import {
  RkTabSet,
  RkTabSetItem,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { TabContentScreen } from './TabContentScreen';

export class TabSetScreen extends React.Component {
  static navigationOptions = {
    title: 'Tab Set',
  };
  static propTypes = {};

  render() {
    return (
      <View style={styles.container}>
        <RkTabSet>
          <RkTabSetItem title="Tab #1">
            <TabContentScreen style={styles.tabContent1} />
          </RkTabSetItem>
          <RkTabSetItem title="Tab #2" isSelected={true}>
            <TabContentScreen style={styles.tabContent2} message='Tab 2 loves React Native UI Kitten' />
          </RkTabSetItem>
          <RkTabSetItem title="Tab #3">
            <TabContentScreen style={styles.tabContent3} />
          </RkTabSetItem>
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
