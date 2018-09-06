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
    const isWasSelected = RkCalendarUtil.isSameDaySafe(this.props.date, this.props.selected);
    const isWillSelected = RkCalendarUtil.isSameDaySafe(this.props.date, nextProps.selected);
    return isSizeChanged || isWasSelected || isWillSelected;
  }

  onPress = () => {
    this.props.onSelect(this.props.date);
  };

  isToday = () => RkCalendarUtil.isSameDaySafe(this.props.date, RkCalendarUtil.today());

  isSmallerThanMin = () => RkCalendarUtil.compareDates(this.props.date, this.props.min) < 0;

  isGreaterThanMax = () => RkCalendarUtil.compareDates(this.props.date, this.props.max) > 0;

  isFitsFilter = () => this.props.filter(this.props.date);

  isSelected = () => RkCalendarUtil.isSameDaySafe(this.props.date, this.props.selected);

  isDisabled = () => this.isEmpty() || this.isSmallerThanMin() || this.isGreaterThanMax() || !this.isFitsFilter();

  isEmpty = () => this.props.date === RkCalendarUtil.defaultBoundingFallback;

  getDate = () => (this.isEmpty() ? defaultDayValue : this.props.date.getDate());

  getTextStyle = () => {
    const containerBaseStyle = this.isToday() ? [styles.container, styles.containerToday] : styles.container;
    const textBaseStyle = this.isToday() ? [styles.text, styles.textToday] : styles.text;
    return {
      container: {
        base: containerBaseStyle,
        selected: this.isSelected() ? styles.containerSelected : null,
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
      disabled={this.isSelected() || this.isDisabled()}
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
