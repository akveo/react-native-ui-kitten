import React from 'react';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  RangeCalendar,
  RangeCalendarProps,
} from './rangeCalendar.component';
import { CalendarRange } from './type';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

describe('@range-calendar: component checks', () => {

  /*
   * Get rid of useNativeDriver warnings
   */
  beforeAll(() => {
    jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const now: Date = new Date();

  const TestRangeCalendar = React.forwardRef((
    props: Partial<RangeCalendarProps>,
    ref: React.Ref<RangeCalendar>) => {

    const [range, setRange] = React.useState<CalendarRange<Date>>(props.range || {});

    const onSelect = (nextRange: CalendarRange<Date>): void => {
      setRange(nextRange);
      props.onSelect && props.onSelect(nextRange);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <RangeCalendar
          ref={ref}
          {...props}
          range={range}
          onSelect={onSelect}
        />
      </ApplicationProvider>
    );
  });

  it('should call onSelect only with start date', () => {
    const onSelect = jest.fn((range: CalendarRange<Date>) => {
      expect(range).toEqual({
        startDate: new Date(now.getFullYear(), now.getMonth(), 7),
        endDate: null,
      });
    });

    const component = render(
      <TestRangeCalendar onSelect={onSelect}/>,
    );

    fireEvent.press(component.queryAllByText('7')[0]);
  });

  it('should call onSelect with start and end dates if start date passed to props', () => {
    const onSelect = jest.fn((range: CalendarRange<Date>) => {
      expect(range).toEqual({
        startDate: new Date(now.getFullYear(), now.getMonth(), 7),
        endDate: new Date(now.getFullYear(), now.getMonth(), 8),
      });
    });

    const component = render(
      <TestRangeCalendar
        range={{ startDate: new Date(now.getFullYear(), now.getMonth(), 7) }}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(component.queryAllByText('8')[0]);
  });

  it('should call onSelect only with start date if start and end dates passed to props', () => {
    const onSelect = jest.fn((range: CalendarRange<Date>) => {
      expect(range).toEqual({
        startDate: new Date(now.getFullYear(), now.getMonth(), 7),
        endDate: null,
      });
    });

    const initialRange: CalendarRange<Date> = {
      startDate: new Date(now.getFullYear(), now.getMonth(), 7),
      endDate: new Date(now.getFullYear(), now.getMonth(), 8),
    };

    const component = render(
      <TestRangeCalendar
        range={initialRange}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(component.queryAllByText('7')[0]);
  });
});
