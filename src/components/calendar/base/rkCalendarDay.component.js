import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarService from '../services/index';
import { RkStyleSheet } from '../../../styles/styleSheet';

const defaultDayValue = '';

export class RkCalendarDayComponent extends React.Component {
  static propTypes = {
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date),
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
      isSelected: RkCalendarService.Date.isSameDaySafe(props.date, props.selected) || false,
      isDisabled: !isFitsFilter || (!RkCalendarService.Date.isBetweenSafe(props.date, props.min, props.max) || false),
      isToday: (RkCalendarService.Date.isSameDaySafe(props.date, RkCalendarService.Date.today()) || false),
      isEmpty: props.date === RkCalendarService.Month.defaultBoundingFallback,
    };
  }

  shouldComponentUpdate(nextProps) {
    const isSizeChanged = nextProps.size !== this.props.size;
    const isWasSelected = RkCalendarService.Date.isSameDaySafe(this.props.date, this.props.selected);
    const isWillSelected = RkCalendarService.Date.isSameDaySafe(this.props.date, nextProps.selected);
    return isSizeChanged || isWasSelected || isWillSelected;
  }

  onPress = () => {
    this.props.onSelect(this.props.date);
  };

  getTextStyle = () => {
    const containerBaseStyle = this.state.isToday ? [styles.container, styles.containerToday] : styles.container;
    const textBaseStyle = this.state.isToday ? [styles.text, styles.textToday] : styles.text;
    return {
      container: {
        base: containerBaseStyle,
        selected: this.state.isSelected ? styles.containerSelected : null,
        disabled: this.state.isDisabled ? styles.containerDisabled : null,
      },
      text: {
        base: textBaseStyle,
        selected: this.state.isSelected ? styles.textSelected : null,
        disabled: this.state.isDisabled ? styles.textDisabled : null,
      },
    };
  };

  renderText = (date, state) => {
    const { container, text } = this.getTextStyle();
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
        disabled={this.state.isSelected || this.state.isDisabled}
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
