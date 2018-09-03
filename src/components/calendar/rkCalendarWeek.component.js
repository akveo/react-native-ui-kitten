import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../styles/styleSheet';

export class RkCalendarWeek extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.element.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    dates: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date),
    daySize: PropTypes.number,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    daySize: 0,
    onSelect: (() => null),
  };

  onDaySelect = (date) => {
    this.props.onSelect(date);
  };

  getChildComponents = () => this.props.dates.map(this.renderDay);

  renderDay = (item) => {
    const DayComponent = this.props.dayComponent;
    return (
      <DayComponent
        style={{ width: this.props.daySize, height: this.props.daySize }}
        min={this.props.min}
        max={this.props.max}
        date={item}
        selected={this.props.selected}
        onSelect={this.onDaySelect}
      />
    );
  };

  render = () => (
    <View style={styles.container}>{this.getChildComponents()}</View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
  },
}));

