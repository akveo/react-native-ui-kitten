import React from 'react';
import { RkCalendar } from 'react-native-ui-kitten';

export class CalendarScreen extends React.Component {
  static data = {
    // min: new Date(2018, 0, 1),
    // max: new Date(2030, 0, 1),
    min: new Date(2018, 0, 1),
    max: new Date(2018, 1, 13),
  };

  onDaySelect = () => {

  };

  render = () => (
    <RkCalendar
      min={CalendarScreen.data.min}
      max={CalendarScreen.data.max}
      boundingMonth={false}
      onDaySelect={this.onDaySelect}
    />
  );
}
