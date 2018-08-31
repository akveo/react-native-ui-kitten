import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarUtil from './services';

const defaultDayValue = '';

export class RkCalendarDayComponent extends React.Component {
  static propTypes = {
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  onPress = () => {
    this.props.onSelect();
  };

  isSmallerThanMin = () => RkCalendarUtil.compareDates(this.props.date, this.props.min) < 0;

  isGreaterThanMax = () => RkCalendarUtil.compareDates(this.props.date, this.props.max) > 0;

  isDisabled = () => this.isEmpty() || this.isSmallerThanMin() || this.isGreaterThanMax();

  isEmpty = () => this.props.date === RkCalendarUtil.defaultBoundingFallback;

  getDate = () => (this.isEmpty() ? defaultDayValue : this.props.date.getDate());

  render = () => (
    <TouchableWithoutFeedback
      disabled={this.isDisabled()}
      onPress={this.onPress}>
      <View style={[styles.container, this.props.style]}>
        <Text
          style={[styles.text, { backgroundColor: this.isDisabled() ? 'transparent' : 'green' }]}>
          {this.getDate()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
  },
});
