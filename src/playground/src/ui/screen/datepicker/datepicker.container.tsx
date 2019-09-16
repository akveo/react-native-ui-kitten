import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ImageProps,
  Image,
} from 'react-native';
import {
  Calendar,
  RangeCalendar,
  Modal,
  Button,
  Icon,
  IconElement,
  Datepicker,
  RangeDatepicker,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';
import { CalendarRange } from '@kitten/ui/calendar/type';

const now: Date = new Date();

interface State {
  date: Date;
  range: CalendarRange<Date>;
}

export class DatepickerContainer extends React.Component<any, State> {

  public state: State = {
    date: null,
    range: {
      startDate: null,
      endDate: null,
    },
  };

  private setDate = (date: Date): void => {
    this.setState({ date });
  };

  private setRange = (range: CalendarRange<Date>): void => {
    this.setState({ range }, () => console.log(this.state.range));
  };

  private renderIcon = (style: StyleType): IconElement<any> => {
    return (
      <Icon name='calendar-outline' {...style}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        {/*<Calendar*/}
          {/*date={this.state.date}*/}
          {/*min={new Date(now.getFullYear() - 20, 0, 1)}*/}
          {/*max={new Date(now.getFullYear() + 10, 0, 1)}*/}
          {/*onSelect={this.setDate}*/}
        {/*/>*/}
        <RangeCalendar
          range={this.state.range}
          onSelect={this.setRange}
        />


        {/*<Datepicker*/}
        {/*date={this.state.date}*/}
        {/*onSelect={this.setDate}*/}
        {/*/>*/}

        {/*<RangeDatepicker*/}
        {/*range={this.state.range}*/}
        {/*icon={this.renderIcon}*/}
        {/*onSelect={this.setRange}*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
