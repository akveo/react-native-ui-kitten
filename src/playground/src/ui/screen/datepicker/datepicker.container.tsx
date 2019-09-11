import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ImageProps,
  Image,
} from 'react-native';
import {
  Datepicker,
  Calendar,
  Modal,
  Button,
  Icon,
  IconElement,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';
import { CalendarRange } from '@kitten/ui/calendar/type';

interface State {
  date: Date;
  range: CalendarRange<any>;
}

export class DatepickerContainer extends React.Component<any, State> {

  public state: State = {
    date: null,
    range: {
      startDate: null,
      endDate: null,
    },
  };

  private setDate = (date: Date, range: CalendarRange<any>): void => {
    this.setState({
      date: date,
      range: range,
    });
  };

  private renderIcon = (style: StyleType): IconElement<any> => {
    return (
      <Icon name='calendar-outline' {...style}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Datepicker
          date={this.state.date}
          range={this.state.range}
          icon={this.renderIcon}
          onSelect={this.setDate}
        />

        {/*<Calendar*/}
           {/*date={this.state.date}*/}
           {/*range={this.state.range}*/}
           {/*onSelect={this.setDate}*/}
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
