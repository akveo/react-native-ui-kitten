import React from 'react';
import { View } from 'react-native';
import {
  RkCalendar,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export class CalendarScreen extends React.Component {
  onDaySelect = (date) => {
  };

  getBounds = () => {
    const now = new Date();
    return {
      min: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
      max: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
    };
  };

  render = () => {
    const bounds = this.getBounds();
    return (
      <View style={styles.container}>
        <RkCalendar
          type='range'
          min={bounds.min}
          max={bounds.max}
          boundingMonth={false}
          onSelect={this.onDaySelect}
        />
      </View>
    );
  };
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
  },
}));
