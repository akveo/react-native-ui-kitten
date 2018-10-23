import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import * as RkCalendarService from '../services';

export class RkCalendarDaysNames extends React.Component {
  static propTypes = {
    /**
     * day of week component style prop describing width of cell,
     * regularly is the same as rkCalendarDay component daySize prop.
     */
    daySize: PropTypes.number.isRequired,
    style: PropTypes.shape({
      container: View.propTypes.style,
      text: Text.propTypes.style,
    }),
  };

  static defaultProps = {
    style: {
      container: {},
      text: {},
    },
  };

  dayOfWeekNames = RkCalendarService.Locale.getDayOfWeekNames();

  // eslint-disable-next-line arrow-body-style
  getChildComponents = (style) => {
    return this.dayOfWeekNames.map((item, index) => this.renderDayOfWeek(item, index, style));
  };

  renderDayOfWeek = (item, index, style) => (
    <Text
      key={`${index}`}
      style={[styles.text, style, { width: this.props.daySize }]}>
      {item.toUpperCase()}
    </Text>
  );

  render() {
    return (
      <View style={[this.props.style.container, styles.container]}>
        {this.getChildComponents(this.props.style.text)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
  },
});

