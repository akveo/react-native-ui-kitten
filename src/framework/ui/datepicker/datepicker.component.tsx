import React from 'react';
import {
  Button,
  ButtonElement,
} from '../button/button.component';
import {
  Popover,
  PopoverProps,
  PopoverElement,
} from '../popover/popover.component';
import {
  CalendarElement,
  Calendar,
  CalendarProps,
} from '../calendar/calendar.component';
import { styled, StyleType } from '@kitten/theme';
import { Dimensions } from 'react-native';
import { CalendarRange } from '../calendar/type';

interface State {
  visible: boolean;
}

export class DatepickerComponent<D> extends React.Component<CalendarProps<D>, State> {

  static styledComponentName: string = 'Datepicker';

  public state: State = {
    visible: false,
  };

  constructor(props: CalendarProps<D>) {
    super(props);
    this.range = {
      startDate: props.startDate,
      endDate: props.endDate,
    };
  }


  private range: CalendarRange<D>;

  private getComponentStyles = (style: StyleType): StyleType => {
    return {
      popover: {
        indent: style.popoverMarginHorizontal,
      },
    };
  };

  private onSelect = (date: D, range: CalendarRange<D>): void => {
    const { onSelect } = this.props;
    this.range = range;

    if (onSelect) {
      onSelect(date, range);
    }
  };

  private toggleVisible = (): void => {
    const visible: boolean = !this.state.visible;

    this.setState({ visible });
  };

  private formatDateToString = (date: D): string => {
    return new Date(Date.parse(date.toString())).toDateString();
  };

  private getComponentTitle = (): string => {
    const { range, date } = this.props;
    const { startDate, endDate } = this.range;

    if (!date && !startDate && !endDate) {
      return 'Show Calendar';
    }


    if (range) {
      const start: string = startDate ? this.formatDateToString(startDate) : '';
      const end: string = endDate ? this.formatDateToString(endDate) : '';

      return `${start} - ${end}`;
    } else {
      return this.formatDateToString(date);
    }
  };

  private renderCalendar = (): CalendarElement<D> => {
    return (
      <Calendar
        {...this.props}
        onSelect={this.onSelect}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, date } = this.props;
    const { popover } = this.getComponentStyles(themedStyle);

    const popoverStyle: StyleType = {
      width: Dimensions.get('window').width - popover.indent,
    };

    return (
      <Popover
        style={popoverStyle}
        visible={this.state.visible}
        content={this.renderCalendar()}
        onBackdropPress={this.toggleVisible}>
        <Button onPress={this.toggleVisible}>
          {this.getComponentTitle()}
        </Button>
      </Popover>
    );
  }
}

export const Datepicker = styled(DatepickerComponent);
