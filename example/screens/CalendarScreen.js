import React from 'react';
import { RkCalendar } from 'react-native-ui-kitten';

export class CalendarScreen extends React.Component {
  onDaySelect = (date) => {
  };

  getBounds = () => {
    const now = new Date();
    return {
      min: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      max: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
    };
  };

  render = () => {
    const bounds = this.getBounds();
    return (
      <RkCalendar
        min={bounds.min}
        max={bounds.max}
        boundingMonth={false}
        onSelect={this.onDaySelect}
      />
    );
  };
}
