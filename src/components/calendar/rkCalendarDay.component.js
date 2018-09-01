import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarUtil from './services';
import { RkStyleSheet } from '../../styles/styleSheet';

const defaultDayValue = '';

export class RkCalendarDayComponent extends React.Component {
  static propTypes = {
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date),
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    selected: RkCalendarUtil.today(),
    onSelect: (() => null),
  };

  onPress = () => {
    this.props.onSelect(this.props.date);
  };

  isSmallerThanMin = () => RkCalendarUtil.compareDates(this.props.date, this.props.min) < 0;

  isGreaterThanMax = () => RkCalendarUtil.compareDates(this.props.date, this.props.max) > 0;

  isSelected = () => RkCalendarUtil.isSameDaySafe(this.props.date, this.props.selected);

  isDisabled = () => this.isEmpty() || this.isSmallerThanMin() || this.isGreaterThanMax();

  isEmpty = () => this.props.date === RkCalendarUtil.defaultBoundingFallback;

  getDate = () => (this.isEmpty() ? defaultDayValue : this.props.date.getDate());

  renderText = () => {
    const selectedStyle = this.isSelected() ? styles.textSelected : null;
    const disabledStyle = this.isDisabled() ? styles.textDisabled : null;
    return (
      <Text
        style={[styles.text, selectedStyle, disabledStyle]}>
        {this.getDate()}
      </Text>
    );
  };

  render = () => (
    <TouchableWithoutFeedback
      disabled={this.isDisabled()}
      onPress={this.onPress}>
      <View style={[styles.container, this.props.style]}>{this.renderText()}</View>
    </TouchableWithoutFeedback>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    padding: 2,
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    color: theme.colors.button.text,
    backgroundColor: theme.colors.button.primary,
  },
  textSelected: {
    backgroundColor: theme.colors.button.primaryActive,
  },
  textDisabled: {
    backgroundColor: 'transparent',
  },
}));
