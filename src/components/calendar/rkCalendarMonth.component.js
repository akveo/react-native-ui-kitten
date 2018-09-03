import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../styles/styleSheet';
import * as RkCalendarUtil from './services';
import { RkCalendarWeek } from './rkCalendarWeek.component';

export class RkCalendarMonthComponent extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.element.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date),
    boundingMonth: PropTypes.bool,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    selected: RkCalendarUtil.today(),
    boundingMonth: true,
    onSelect: (() => null),
  };

  state = {
    daySize: 0,
  };

  onDaySelect = (date) => {
    this.props.onSelect(date);
  };

  onLayout = (event) => {
    this.setState({
      daySize: event.nativeEvent.layout.width / RkCalendarUtil.DAYS_IN_WEEK,
    });
  };

  getData = () => RkCalendarUtil.createDaysGrid(this.props.date, this.props.boundingMonth);

  getChildComponents = () => this.getData().map(this.renderWeek);

  renderWeek = (item) => (
    <RkCalendarWeek
      dayComponent={this.props.dayComponent}
      min={this.props.min}
      max={this.props.max}
      dates={item}
      selected={this.props.selected}
      onSelect={this.onDaySelect}
      daySize={this.state.daySize}
    />
  );

  render = () => (
    <View
      style={styles.container}
      onLayout={this.onLayout}>
      {this.getChildComponents()}
    </View>
  )
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    margin: 4,
    backgroundColor: theme.colors.overlay,
  },
}));
