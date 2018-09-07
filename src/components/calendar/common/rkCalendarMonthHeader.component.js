import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RkCalendarDaysNames } from './rkCalendarDaysNames.component';
import { RkCalendarMonthName } from './rkCalendarMonthName.component';
import { RkStyleSheet } from '../../../styles/styleSheet';

export class RkCalendarMonthHeader extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    /**
     * day of week component style prop describing width of cell,
     * regularly is the same as rkCalendarDay component daySize prop.
     */
    daySize: PropTypes.number.isRequired,
  };

  render = () => (
    <View style={styles.container}>
      <RkCalendarMonthName date={this.props.date} />
      <RkCalendarDaysNames daySize={this.props.daySize} />
    </View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    backgroundColor: theme.colors.highlight,
  },
}));
