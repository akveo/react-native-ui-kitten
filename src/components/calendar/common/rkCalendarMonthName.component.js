import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../../styles/styleSheet';
import * as RkCalendarService from '../services';

export class RkCalendarMonthName extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  render = () => {
    const text = `${RkCalendarService.Locale.getMonthName(this.props.date)}, ${this.props.date.getFullYear()}`;
    return (
      <Text style={styles.container}>{text}</Text>
    );
  };
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    fontSize: theme.fonts.sizes.xlarge,
  },
}));
