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
    selected: PropTypes.instanceOf(Date).isRequired,
    onSelect: PropTypes.func,
    /**
     * style prop describing width and height of cell
     */
    size: PropTypes.number.isRequired,
  };
  static defaultProps = {
    onSelect: (() => null),
  };

  shouldComponentUpdate(nextProps) {
    const isSizeChanged = nextProps.size !== this.props.size;
    const isWasSelected = RkCalendarUtil.isSameDaySafe(this.props.date, this.props.selected);
    const isWillSelected = RkCalendarUtil.isSameDaySafe(this.props.date, nextProps.selected);
    return isSizeChanged || isWasSelected || isWillSelected;
  }

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
      disabled={this.isSelected() || this.isDisabled()}
      onPress={this.onPress}>
      <View style={[styles.container, { width: this.props.size, height: this.props.size }]}>
        {this.renderText()}
      </View>
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
