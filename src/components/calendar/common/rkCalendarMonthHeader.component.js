import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RkCalendarDaysNames } from './rkCalendarDaysNames.component';
import { RkCalendarMonthName } from './rkCalendarMonthName.component';

/**
 * @extends React.Component
 */
export class RkCalendarMonthHeader extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    /**
     * day of week component style prop describing width of cell,
     * regularly is the same as rkCalendarDay component daySize prop.
     */
    daySize: PropTypes.number.isRequired,
    style: PropTypes.shape({
      container: View.propTypes.style,
      monthName: RkCalendarMonthName.propTypes.style,
      weekDays: RkCalendarDaysNames.propTypes.style,
    }),
  };

  static defaultProps = {
    style: {
      container: {},
      monthName: RkCalendarMonthName.defaultProps.style,
      weekDays: RkCalendarDaysNames.defaultProps.style,
    },
  };

  render() {
    return (
      <View style={this.props.style.container}>
        <RkCalendarMonthName
          style={this.props.style.monthName}
          date={this.props.date}
        />
        <RkCalendarDaysNames
          style={this.props.style.weekDays}
          daySize={this.props.daySize}
        />
      </View>
    );
  }
}
