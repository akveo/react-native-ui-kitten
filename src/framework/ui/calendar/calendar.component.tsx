import React from 'react';
import {
  BaseCalendarComponent,
  BaseCalendarProps,
} from './baseBalendar.component';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';
import { CalendarDateInfo } from './type';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import { DateBatch } from './service/calendarData.service';

interface ComponentProps<D> {
  date?: D;
  onSelect: (date: D) => void;
}

export type CalendarProps<D> = ComponentProps<D> & BaseCalendarProps<D> & StyledComponentProps;
export type CalendarElement<D> = React.ReactElement<CalendarProps<D>>;

export class CalendarComponent<D> extends BaseCalendarComponent<D, CalendarProps<D>> {

  static styledComponentName: string = 'Calendar';

  public get date(): D {
    return this.props.date || this.dateService.today();
  }

  public isDaySelected(date: CalendarDateInfo<D>): boolean {
    return this.dateService.isSameDaySafe(date.date, this.date);
  }

  public onDaySelect(date: CalendarDateInfo<D>): void {
    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(date.date);
    }
  }

  public shouldUpdateDayElement(props: CalendarPickerCellProps<D>,
                                nextProps: CalendarPickerCellProps<D>): boolean {

    const dateChanged: boolean = this.dateService.compareDatesSafe(props.date.date, nextProps.date.date) !== 0;

    if (dateChanged) {
      return true;
    }

    const selectionChanged: boolean = props.selected !== nextProps.selected;
    const disablingChanged: boolean = props.disabled !== nextProps.disabled;

    const value: boolean = selectionChanged || disablingChanged;

    if (value) {
      return true;
    }

    return props.theme !== nextProps.theme;
  }

  public getDayPickerData(date: CalendarDateInfo<D>): DateBatch<D> {
    return this.dataService.createDayPickerData(date.date);
  }

}

export const Calendar = styled(CalendarComponent);
