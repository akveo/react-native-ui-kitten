import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarUtil from '../services';
import { RkStyleSheet } from '../../../styles/styleSheet';

const defaultDayValue = '';

export class RkRangedCalendarDay extends React.Component {
  static propTypes = {
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }),
    filter: PropTypes.func,
    onSelect: PropTypes.func,
    /**
     * style prop describing width and height of cell
     */
    size: PropTypes.number.isRequired,
  };
  static defaultProps = {
    filter: (() => true),
    onSelect: (() => null),
  };

  shouldComponentUpdate(nextProps) {
    const isSizeChanged = nextProps.size !== this.props.size;
    const isWasInRange = this.isInRange(this.props.selected);
    const isWillInRange = this.isInRange(nextProps.selected);
    return isSizeChanged || (!isWasInRange && isWillInRange) || (isWasInRange && !isWillInRange);
  }

  onPress = () => {
    this.props.onSelect(this.props.date);
  };

  isInRange = (range) => {
    const isSelectionStart = range.start !== undefined;
    const isSelectionEnd = range.end !== undefined;
    if (isSelectionStart && !isSelectionEnd) {
      return RkCalendarUtil.isSameDaySafe(this.props.date, range.start);
    } else if (isSelectionStart && isSelectionEnd) {
      const isRangeStart = RkCalendarUtil.isSameDaySafe(this.props.date, range.start);
      const isRangeEnd = RkCalendarUtil.isSameDaySafe(this.props.date, range.end);
      const isBetweenRange = RkCalendarUtil.isBetweenSafe(this.props.date, range.start, range.end);
      return isRangeStart || isRangeEnd || isBetweenRange;
    }
    return false;
  };

  isToday = () => RkCalendarUtil.isSameDaySafe(this.props.date, RkCalendarUtil.today());

  isSmallerThanMin = () => RkCalendarUtil.compareDates(this.props.date, this.props.min) < 0;

  isGreaterThanMax = () => RkCalendarUtil.compareDates(this.props.date, this.props.max) > 0;

  isFitsFilter = () => this.props.filter(this.props.date);

  isSelected = () => this.isInRange(this.props.selected);

  isDisabled = () => this.isEmpty() || this.isSmallerThanMin() || this.isGreaterThanMax() || !this.isFitsFilter();

  isEmpty = () => this.props.date === RkCalendarUtil.defaultBoundingFallback;

  getDate = () => (this.isEmpty() ? defaultDayValue : this.props.date.getDate());

  getTextStyle = () => {
    const isBetweenRangeBounds = RkCalendarUtil.isBetweenSafe(this.props.date, this.props.selected.start, this.props.selected.end);
    const containerBaseStyle = this.isToday() ? [styles.container, styles.containerToday] : styles.container;
    const containerSelectedStyle = isBetweenRangeBounds ? styles.containerSelectedBetween : styles.containerSelected;
    const textBaseStyle = this.isToday() ? [styles.text, styles.textToday] : styles.text;
    return {
      container: {
        base: containerBaseStyle,
        selected: this.isSelected() ? containerSelectedStyle : null,
        disabled: this.isDisabled() ? styles.containerDisabled : null,
      },
      text: {
        base: textBaseStyle,
        selected: this.isSelected() ? styles.textSelected : null,
        disabled: this.isDisabled() ? styles.textDisabled : null,
      },
    };
  };

  renderText = () => {
    const { container, text } = this.getTextStyle();
    return (
      <View style={[container.base, container.selected, container.disabled]}>
        <Text
          style={[text.base, text.selected, text.disabled]}>
          {this.getDate()}
        </Text>
      </View>
    );
  };

  render = () => (
    <TouchableWithoutFeedback
      disabled={this.isDisabled()}
      onPress={this.onPress}>
      <View style={{ width: this.props.size, height: this.props.size }}>
        {this.renderText()}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  containerToday: {
    backgroundColor: theme.colors.highlight,
  },
  containerSelected: {
    backgroundColor: theme.colors.button.success,
    borderRadius: 4,
  },
  containerSelectedBetween: {
    backgroundColor: theme.colors.button.success,
    opacity: 0.25,
    borderRadius: 0,
  },
  containerDisabled: {
    opacity: 0.25,
  },
  text: {
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.text.base,
    fontWeight: '300',
  },
  textToday: {
    fontWeight: 'bold',
  },
  textSelected: {
    color: theme.colors.text.inverse,
    fontWeight: 'bold',
  },
  textDisabled: {
  },
}));
