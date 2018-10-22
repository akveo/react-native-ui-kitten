import React from 'react';
import { View } from 'react-native';
import {
  RkCalendar,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export class BoundingCalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Bounding Month Calendar',
  };

  render() {
    return (
      <View style={styles.container}>
        <RkCalendar
          min={new Date(2018, 0, 1)}
          max={new Date(2019, 0, 1)}
          boundingMonth={false}
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
