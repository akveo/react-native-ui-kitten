import React from 'react';
import { View } from 'react-native';
import {
  RkCalendar,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export class RangeCalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Range Calendar',
  };

  render() {
    return (
      <View style={styles.container}>
        <RkCalendar
          type='range'
          min={new Date(2018, 0, 1)}
          max={new Date(2019, 0, 1)}
        />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
  },
}));
