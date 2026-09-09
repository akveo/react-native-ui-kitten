import React from 'react';
import { Calendar, Datepicker, RangeCalendar, RangeDatepicker, CalendarRef, RangeCalendarRef, DatepickerRef, RangeDatepickerRef } from '@ui-kitten/components';
import type { Moment } from 'moment';

// Bare: `CalendarRef` defaults `D = Date`, exactly as the v5 `Calendar` class did.
export const calendarRef = React.useRef<CalendarRef>(null);

// Explicit: the argument is carried across, because the v6 ref type is generic too.
export const momentCalendarRef = React.useRef<CalendarRef<Moment>>(null);
export const rangeRef: React.RefObject<RangeCalendarRef<Moment>> = React.createRef();
export const pickerRef = React.useRef<DatepickerRef<Moment>>(null);
export const rangePickerRef = React.useRef<RangeDatepickerRef>(null);
