import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import CalendarLocale from '../services/calendarLocale.service';

export class RkCalendarMonthName extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    style: Text.propTypes.style,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const text = `${CalendarLocale.getMonthName(this.props.date)}, ${this.props.date.getFullYear()}`;
    return (
      <Text style={this.props.style}>{text}</Text>
    );
  }
}
