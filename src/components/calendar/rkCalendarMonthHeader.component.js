import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../styles/styleSheet';
import * as RkCalendarUtil from './services';
import LocaleService from './services/locale.service';

export class RkCalendarMonthHeader extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date).isRequired,
  };

  isSelected = () => RkCalendarUtil.isSameMonthSafe(this.props.date, this.props.selected);

  renderText = () => {
    const text = `${LocaleService.getMonthName(this.props.date)}, ${this.props.date.getFullYear()}`;
    return (
      <Text style={styles.text}>{text}</Text>
    );
  };

  render = () => (
    <View style={styles.container}>{this.renderText()}</View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.fonts.sizes.xlarge,
  },
}));
