import React from 'react';
import {
  CalendarElement,
  Calendar,
  CalendarProps,
} from '../calendar/calendar.component';
import { styled } from '@kitten/theme';
import { BaseDatepickerComponent } from './baseDatepicker.component';

export class DatepickerComponent<D> extends BaseDatepickerComponent<D, CalendarProps<D>> {

  static styledComponentName: string = 'Datepicker';

  public getComponentTitle(): string {
    const { date } = this.props;

    if (date) {
      return this.formatDateToString(date);
    } else {
      return 'dd/mm/yyyy';
    }
  }

  public renderCalendar(): CalendarElement<D> {
    return (
      <Calendar {...this.props}/>
    );
  }
}

export const Datepicker = styled(DatepickerComponent);
