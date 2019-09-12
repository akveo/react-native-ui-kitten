import React from 'react';
import {
  BaseCalendarComponent,
  BaseCalendarProps,
} from './baseBalendar.component';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';
import {
  CalendarDateInfo,
  CalendarRange,
} from './type';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import { DateBatch } from './service/calendarData.service';
import { RangeService } from './service/range.service';

interface ComponentProps<D> {
  range: CalendarRange<D>;
  onSelect: (range: CalendarRange<D>) => void;
}

export type RangeCalendarProps<D> = ComponentProps<D> & BaseCalendarProps<D> & StyledComponentProps;
export type RangeCalendarElement<D> = React.ReactElement<RangeCalendarProps<D>>;

class RangeCalendarComponent<D> extends BaseCalendarComponent<D, RangeCalendarProps<D>> {

  static styledComponentName: string = 'Calendar';

  public get date(): D {
    return this.dateService.today();
  }

  private rangeService: RangeService<D> = new RangeService(this.dateService);

  public isDaySelected(date: CalendarDateInfo<D>): boolean {
    return false;
  }

  public onDaySelect(date: CalendarDateInfo<D>): void {
    const { range, onSelect } = this.props;

    const calendarRange: CalendarRange<D> = this.rangeService.getRange(range, date);
    onSelect && onSelect(calendarRange);
  }

  public shouldUpdateDayElement(props: CalendarPickerCellProps<D>,
                                nextProps: CalendarPickerCellProps<D>): boolean {

    const dateChanged: boolean = this.dateService.compareDatesSafe(props.date.date, nextProps.date.date) !== 0;

    if (dateChanged) {
      return true;
    }

    const selectionChanged: boolean = props.selected !== nextProps.selected;
    const disablingChanged: boolean = props.disabled !== nextProps.disabled;
    const rangeChanged: boolean = props.range !== nextProps.range;
    const rangeStartPlaceChanged: boolean = props.firstRangeItem !== nextProps.firstRangeItem;
    const rangeEndPlaceChanged: boolean = props.lastRangeItem !== nextProps.lastRangeItem;

    const value: boolean = selectionChanged || disablingChanged ||
      rangeChanged || rangeStartPlaceChanged || rangeEndPlaceChanged;

    if (value) {
      return true;
    }

    return props.theme !== nextProps.theme;
  }

  public getDayPickerData(date: CalendarDateInfo<D>): DateBatch<D> {
    return this.dataService.createDayPickerData(date.date, this.props.range);
  }

}

export const RangeCalendar = styled(RangeCalendarComponent);
