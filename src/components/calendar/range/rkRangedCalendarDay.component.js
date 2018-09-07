import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarService from '../services';
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
    renderContent: PropTypes.func,
    filter: PropTypes.func,
    onSelect: PropTypes.func,
    /**
     * style prop describing width and height of cell
     */
    size: PropTypes.number.isRequired,
  };
  static defaultProps = {
    renderContent: undefined,
    filter: (() => true),
    onSelect: (() => null),
  };

  static getDerivedStateFromProps(props) {
    const isFitsFilter = props.filter(props.date);
    return {
      isSelected: RkRangedCalendarDay.isInRange(props.date, props.selected),
      isDisabled: !isFitsFilter || (!RkCalendarService.Date.isBetweenSafe(props.date, props.min, props.max) || false),
      isBetweenRangeBounds: RkCalendarService.Date.isBetweenSafe(props.date, props.selected.start, props.selected.end),
      isToday: (RkCalendarService.Date.isSameDaySafe(props.date, RkCalendarService.Date.today()) || false),
      isEmpty: props.date === RkCalendarService.Month.defaultBoundingFallback,
    };
  }

  static isInRange(date, range) {
    const isSelectionStart = range.start !== undefined;
    const isSelectionEnd = range.end !== undefined;
    if (isSelectionStart && !isSelectionEnd) {
      return RkCalendarService.Date.isSameDaySafe(date, range.start);
    } else if (isSelectionStart && isSelectionEnd) {
      const isRangeStart = RkCalendarService.Date.isSameDaySafe(date, range.start);
      const isRangeEnd = RkCalendarService.Date.isSameDaySafe(date, range.end);
      const isBetweenRange = RkCalendarService.Date.isBetweenSafe(date, range.start, range.end);
      return isRangeStart || isRangeEnd || isBetweenRange;
    }
    return false;
  }

  shouldComponentUpdate(nextProps) {
    const isSizeChanged = nextProps.size !== this.props.size;
    const isWasInRange = RkRangedCalendarDay.isInRange(this.props.date, this.props.selected);
    const isWillInRange = RkRangedCalendarDay.isInRange(this.props.date, nextProps.selected);
    return isSizeChanged || (!isWasInRange && isWillInRange) || (isWasInRange && !isWillInRange);
  }

  onPress = () => {
    this.props.onSelect(this.props.date);
  };

  getTextStyle = (state) => {
    const containerBaseStyle = state.isToday ? [styles.container, styles.containerToday] : styles.container;
    const containerSelectedStyle = state.isBetweenRangeBounds ? styles.containerSelectedBetween : styles.containerSelected;
    const textBaseStyle = state.isToday ? [styles.text, styles.textToday] : styles.text;
    return {
      container: {
        base: containerBaseStyle,
        selected: state.isSelected ? containerSelectedStyle : null,
        disabled: state.isDisabled ? styles.containerDisabled : null,
      },
      text: {
        base: textBaseStyle,
        selected: state.isSelected ? styles.textSelected : null,
        disabled: state.isDisabled ? styles.textDisabled : null,
      },
    };
  };

  renderText = (date, state) => {
    const { container, text } = this.getTextStyle(state);
    return (
      <View style={[container.base, container.selected, container.disabled]}>
        <Text style={[text.base, text.selected, text.disabled]}>
          {state.isEmpty ? defaultDayValue : date.getDate()}
        </Text>
      </View>
    );
  };

  render = () => {
    const contentHeight = this.props.renderContent === undefined ? this.props.size : undefined;
    const renderContentFunction = this.props.renderContent || this.renderText;
    return (
      <TouchableWithoutFeedback
        disabled={this.state.isDisabled}
        onPress={this.onPress}>
        <View style={{ width: this.props.size, height: contentHeight }}>
          {renderContentFunction(this.props.date, this.state)}
        </View>
      </TouchableWithoutFeedback>
    );
  };
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
