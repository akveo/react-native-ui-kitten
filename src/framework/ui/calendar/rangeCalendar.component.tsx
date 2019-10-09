import React from 'react';
import {
  BaseCalendarComponent,
  BaseCalendarProps,
} from './baseCalendar.component';
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
import { RangeDateService } from './service/rangeDate.service';

export interface ComponentProps<D> {
  range: CalendarRange<D>;
  onSelect: (range: CalendarRange<D>) => void;
}

export type RangeCalendarProps<D> = ComponentProps<D> & BaseCalendarProps<D> & StyledComponentProps;
export type RangeCalendarElement<D> = React.ReactElement<RangeCalendarProps<D>>;

/**
 * Styled `RangeCalendar` component.
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
 *
 * @property {D} min - Minimal date that is able to be selected.
 *
 * @property {D} max - Maximum date that is able to be selected.
 *
 * @property {CalendarRange<D>} range - Range which is currently selected.
 *
 * @property {DateService<D>} dateService - Date service that is able to work with a date objects.
 * Defaults to Native Date service that works with JS Date.
 * Allows using different types of date like Moment.js or date-fns.
 *
 * @property {boolean} boundingMonth - Defines if we should render previous and next months in the current month view.
 *
 * @property {CalendarViewMode} startView - Defines starting view for calendar. Defaults to Date view.
 *
 * @property {(date: D) => string} title - Defines the title for visible date.
 *
 * @property {(date: D) => string} todayTitle - Defines the title for today's date.
 *
 * @property {(date: D) => ReactElement<any>} filter - Predicate that decides which cells will be disabled.
 *
 * @property {(date: D) => void} onSelect - Selection emitter. Fires when another day cell is pressed.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderDay - Should return the content of day cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderMonth - Should return the content of month cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderYear - Should return the content of year cell.
 *
 * @overview-example RangeCalendarSimpleUsage
 */
export class RangeCalendarComponent<D> extends BaseCalendarComponent<D, RangeCalendarProps<D>> {

  static styledComponentName: string = 'Calendar';

  private rangeDateService: RangeDateService<D> = new RangeDateService(this.dateService);

  // BaseCalendarComponent

  protected onDaySelect(date: CalendarDateInfo<D>): void {
    const { range, onSelect } = this.props;

    const calendarRange: CalendarRange<D> = this.rangeDateService.createRange(range, date);
    onSelect && onSelect(calendarRange);
  }

  protected getSelectedDate(): D {
    return this.dateService.today();
  }

  protected isDaySelected(date: CalendarDateInfo<D>): boolean {
    return false;
  }

  protected shouldUpdateDayElement(props: CalendarPickerCellProps<D>,
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

    const shouldUpdate: boolean =
      selectionChanged
      || disablingChanged
      || rangeChanged
      || rangeStartPlaceChanged
      || rangeEndPlaceChanged;

    if (shouldUpdate) {
      return true;
    }

    return props.theme !== nextProps.theme;
  }

  protected getDayPickerData(date: CalendarDateInfo<D>): DateBatch<D> {
    return this.dataService.createDayPickerData(date.date, this.props.range);
  }
}

export const RangeCalendar = styled(RangeCalendarComponent);
