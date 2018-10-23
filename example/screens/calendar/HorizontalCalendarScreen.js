import React from 'react';
import { View } from 'react-native';
import {
  RkButton,
  RkCalendar,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export class HorizontalCalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Horizontal Calendar',
  };

  state = {
    min: new Date(2018, 0, 1),
    max: new Date(2019, 0, 1),
    visibleMonth: undefined,
  };

  calendarRef = undefined;

  onPrevButtonPress = () => {
    this.calendarRef.scrollToPreviousMonth();
  };

  onNextButtonPress = () => {
    this.calendarRef.scrollToNextMonth();
  };

  onTodayButtonPress = () => {
    this.calendarRef.scrollToToday();
  };

  onVisibleMonthChanged = (date) => {
    this.setState({
      visibleMonth: date,
    });
  };

  setCalendarRef = (ref) => {
    this.calendarRef = ref;
  };

  isSameMonth = (date1, date2) => {
    const isNotNull = date1 && date2;
    return isNotNull
      && date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth();
  };

  isPrevButtonEnabled = () => !this.isSameMonth(this.state.visibleMonth, this.state.min);

  isNextButtonEnabled = () => !this.isSameMonth(this.state.visibleMonth, this.state.max);

  renderControlButtons = () => {
    const prevButtonStyle = this.isPrevButtonEnabled() ? {} : { opacity: 0.5 };
    const nextButtonStyle = this.isNextButtonEnabled() ? {} : { opacity: 0.5 };
    return (
      <View style={styles.controlContainer}>
        <RkButton
          disabled={this.isSameMonth(this.state.visibleMonth, this.state.min)}
          style={[styles.controlButton, prevButtonStyle]}
          rkType='stretch success'
          onPress={this.onPrevButtonPress}>
          {'<'}
        </RkButton>
        <RkButton
          style={styles.controlButton}
          rkType='success'
          onPress={this.onTodayButtonPress}>
          TODAY
        </RkButton>
        <RkButton
          disabled={this.isSameMonth(this.state.visibleMonth, this.state.max)}
          style={[styles.controlButton, nextButtonStyle]}
          rkType='stretch success'
          onPress={this.onNextButtonPress}>
          {'>'}
        </RkButton>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderControlButtons()}
        <RkCalendar
          ref={this.setCalendarRef}
          layout='horizontal'
          min={this.state.min}
          max={this.state.max}
          onVisibleMonthChanged={this.onVisibleMonthChanged}
        />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
    backgroundColor: theme.colors.highlight,
  },
  controlButton: {
    marginHorizontal: 8,
    paddingHorizontal: 16,
  },
  controlButtonText: {

  },
}));
