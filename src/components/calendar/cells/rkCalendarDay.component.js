import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarService from '../services';

const defaultDayValue = '';

export class RkCalendarDay extends React.Component {
  static propTypes = {
    // used in selection-strategy
    // eslint-disable-next-line react/no-unused-prop-types
    min: PropTypes.instanceOf(Date).isRequired,
    // used in selection-strategy
    // eslint-disable-next-line react/no-unused-prop-types
    max: PropTypes.instanceOf(Date).isRequired,
    // used in selection-strategy
    // eslint-disable-next-line react/no-unused-prop-types
    monthDate: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date),
    // used in selection-strategy
    // eslint-disable-next-line react/no-unused-prop-types
    selected: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }),
    renderContent: PropTypes.func,
    // used in selection-strategy
    // eslint-disable-next-line react/no-unused-prop-types
    filter: PropTypes.func,
    onSelect: PropTypes.func,
    selectionStrategy: PropTypes.shape({
      getStateFromSelection: PropTypes.func.isRequired,
      isDaySelected: PropTypes.func.isRequired,
      isDayHighlighted: PropTypes.func.isRequired,
      isDayDisabled: PropTypes.func.isRequired,
      isDayToday: PropTypes.func.isRequired,
      isDayEmpty: PropTypes.func.isRequired,
      shouldUpdateDay: PropTypes.func.isRequired,
      shouldUpdateWeek: PropTypes.func.isRequired,
      shouldUpdateMonth: PropTypes.func.isRequired,
      shouldUpdateYear: PropTypes.func.isRequired,
    }).isRequired,

    size: PropTypes.number.isRequired,

    style: PropTypes.shape({
      container: PropTypes.shape({
        base: View.propTypes.style,
        today: View.propTypes.style,
        selected: View.propTypes.style,
        highlighted: View.propTypes.style,
        disabled: View.propTypes.style,
      }),
      text: PropTypes.shape({
        base: Text.propTypes.style,
        today: Text.propTypes.style,
        selected: Text.propTypes.style,
        highlighted: Text.propTypes.style,
        disabled: Text.propTypes.style,
      }),
    }),
  };

  static defaultProps = {
    date: RkCalendarService.Month.defaultBoundingFallback,
    selected: undefined,
    renderContent: undefined,
    filter: (() => true),
    onSelect: (() => null),

    style: {
      container: {
        base: {},
        today: {},
        selected: {},
        highlighted: {},
        disabled: {},
      },
      text: {
        base: {},
        today: {},
        selected: {},
        highlighted: {},
        disabled: {},
      },
    },
  };

  state = {
    isSelected: false,
    isHighlighted: false,
    isDisabled: false,
    isToday: false,
    isEmpty: false,
  };

  static getDerivedStateFromProps(props) {
    return {
      isSelected: props.selectionStrategy.isDaySelected(props),
      isHighlighted: props.selectionStrategy.isDayHighlighted(props),
      isDisabled: props.selectionStrategy.isDayDisabled(props),
      isToday: props.selectionStrategy.isDayToday(props),
      isEmpty: props.selectionStrategy.isDayEmpty(props),
    };
  }

  shouldComponentUpdate(nextProps) {
    const isSizeChanged = nextProps.size !== this.props.size;
    return isSizeChanged || nextProps.selectionStrategy.shouldUpdateDay(this.props, nextProps);
  }

  onPress = () => {
    this.props.onSelect(this.props.date);
  };

  getContentStyle = (state, style) => ({
    container: {
      base: state.isToday ? [style.container.base, style.container.today] : style.container.base,
      selected: state.isSelected ? style.container.selected : null,
      highlighted: state.isHighlighted ? style.container.highlighted : null,
      disabled: state.isDisabled ? style.container.disabled : null,
    },
    text: {
      base: state.isToday ? [style.text.base, style.text.today] : style.text.base,
      selected: state.isSelected ? style.text.selected : null,
      highlighted: state.isHighlighted ? style.text.highlighted : null,
      disabled: state.isDisabled ? style.text.disabled : null,
    },
  });

  renderText = (date, state) => {
    const styles = this.getContentStyle(state, this.props.style);
    return (
      <View style={[
        styles.container.base,
        styles.container.selected,
        styles.container.highlighted,
        styles.container.disabled,
        { flex: 1 },
      ]}>
        <Text style={[
          styles.text.base,
          styles.text.selected,
          styles.text.highlighted,
          styles.text.disabled,
        ]}>
          {state.isEmpty ? defaultDayValue : date.getDate()}
        </Text>
      </View>
    );
  };

  render() {
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
  }
}
