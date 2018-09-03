import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import { RkStyleSheet } from '../../styles/styleSheet';

export class RkCalendarDaysNames extends React.Component {
  static propTypes = {
    dayOfWeekNames: PropTypes.arrayOf(PropTypes.string),
    /**
     * day of week component style prop describing width of cell,
     * regularly is the same as rkCalendarDay component daySize prop.
     */
    daySize: PropTypes.number.isRequired,
  };
  static defaultProps = {
    // TODO: locale-dependent
    dayOfWeekNames: ['s', 'm', 't', 'w', 't', 'f', 's'],
  };

  getChildComponents = () => this.props.dayOfWeekNames.map(this.renderDayOfWeek);

  renderDayOfWeek = (item) => (
    <Text
      style={[styles.text]}>
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
  },
  text: {
    flex: 1,
    fontSize: theme.fonts.sizes.base,
    textAlign: 'center',
    color: theme.colors.text.base,
  },
}));

