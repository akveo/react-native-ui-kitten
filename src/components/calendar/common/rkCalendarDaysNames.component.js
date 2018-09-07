import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import * as RkCalendarService from '../services/index';
import { RkStyleSheet } from '../../../styles/styleSheet';

export class RkCalendarDaysNames extends React.Component {
  static propTypes = {
    /**
     * day of week component style prop describing width of cell,
     * regularly is the same as rkCalendarDay component daySize prop.
     */
    daySize: PropTypes.number.isRequired,
  };

  dayOfWeekNames = RkCalendarService.Locale.getDayOfWeekNames();

  getChildComponents = () => this.dayOfWeekNames.map(this.renderDayOfWeek);

  renderDayOfWeek = (item) => (
    <Text
      style={[styles.text, { width: this.props.daySize }]}>
      {item.toUpperCase()}
    </Text>
  );

  render = () => (
    <View style={styles.container}>{this.getChildComponents()}</View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.fonts.sizes.base,
    color: theme.colors.text.subtitle,
  },
}));

