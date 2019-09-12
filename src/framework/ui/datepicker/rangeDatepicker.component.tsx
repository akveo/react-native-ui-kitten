import React from 'react';
import {
  RangeCalendar,
  RangeCalendarProps,
  RangeCalendarElement,
} from '../calendar/rangeCalendar.component';
import { styled } from '@kitten/theme';
import { BaseDatepickerComponent } from './baseDatepicker.component';

export class RangeDatepickerComponent<D> extends BaseDatepickerComponent<D, RangeCalendarProps<D>> {

  static styledComponentName: string = 'Datepicker';

  public getComponentTitle(): string {
    const { range } = this.props;
    const { startDate, endDate } = range;

    if (startDate || endDate) {
      const start: string = startDate ? this.formatDateToString(startDate) : '';
      const end: string = endDate ? this.formatDateToString(endDate) : '';

      return `${start} - ${end}`;
    } else {
      return 'dd/mm/yyyy';
    }
  }

  public renderCalendar(): RangeCalendarElement<D> {
    return (
      <RangeCalendar {...this.props}/>
    );
  }
}

export const RangeDatepicker = styled(RangeDatepickerComponent);
