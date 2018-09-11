import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../../styles/styleSheet';
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
    date: PropTypes.instanceOf(Date),
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
  };
  static defaultProps = {
    date: RkCalendarService.Month.defaultBoundingFallback,
    selected: undefined,
    renderContent: undefined,
    filter: (() => true),
    onSelect: (() => null),
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

  getContentStyle = (state) => ({
    container: {
      base: state.isToday ? [styles.container, styles.containerToday] : styles.container,
      selected: state.isSelected ? styles.containerSelected : null,
      highlighted: state.isHighlighted ? styles.containerHighlighted : null,
      disabled: state.isDisabled ? styles.containerDisabled : null,
    },
    text: {
      base: state.isToday ? [styles.text, styles.textToday] : styles.text,
      selected: state.isSelected ? styles.textSelected : null,
      highlighted: state.isHighlighted ? styles.textHighlighted : null,
      disabled: state.isDisabled ? styles.textDisabled : null,
    },
  });

  renderText = (date, state) => {
    const { container, text } = this.getContentStyle(state);
    return (
      <View style={[container.base, container.selected, container.highlighted, container.disabled]}>
        <Text style={[text.base, text.selected, text.highlighted, text.disabled]}>
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
  containerHighlighted: {
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
  textHighlighted: {
    fontWeight: '300',
  },
  textDisabled: {},
}));
