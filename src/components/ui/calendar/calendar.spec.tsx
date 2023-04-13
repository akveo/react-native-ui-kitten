/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import { Moment } from 'moment';
import {
  fireEvent,
  render,
  waitForElement,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  Calendar,
  CalendarProps,
} from './calendar.component';
import { CalendarViewModes } from './type';
import { MomentDateService } from '@ui-kitten/moment';
import { Text } from '../text/text.component';

describe('@calendar: component checks', () => {

  /*
   * Get rid of useNativeDriver warnings
   */
  beforeAll(() => {
    jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const now: Date = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

  const TestCalendar = React.forwardRef((
    props: Partial<CalendarProps<Date | Moment>>,
    ref: React.Ref<Calendar>,
  ) => {

    const [date, setDate] = React.useState<Date | Moment>(props.date);

    const onSelect = (nextDate: Date | Moment): void => {
      setDate(date);
      props.onSelect?.(nextDate);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <Calendar
          ref={ref}
          {...props}
          date={date}
          onSelect={onSelect}
        />
      </ApplicationProvider>
    );
  });

  TestCalendar.displayName = 'TestCalendar';

  it('should request date change on day select', () => {
    const onSelect = jest.fn((date: Date) => {
      expect(date).toEqual(new Date(now.getFullYear(), now.getMonth(), 7));
    });

    const component = render(
      <TestCalendar onSelect={onSelect} />,
    );

    fireEvent.press(component.queryByText('7'));
  });

  it('should request date change on month select', async () => {
    const onSelect = jest.fn((date: Date) => {
      expect(date).toEqual(new Date(now.getFullYear(), 6, 7));
    });

    const component = render(
      <TestCalendar
        startView={CalendarViewModes.MONTH}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(component.queryByText('Jul'));
    const dayCell = await waitForElement(() => component.queryByText('7'));

    fireEvent.press(dayCell);
  });

  it('should request date change on year select', async () => {
    const onSelect = jest.fn((date: Date) => {
      expect(date).toEqual(new Date(now.getFullYear() + 1, 6, 7));
    });

    const component = render(
      <TestCalendar
        startView={CalendarViewModes.YEAR}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(component.queryByText(`${now.getFullYear() + 1}`));
    const monthCell = await waitForElement(() => component.queryByText('Jul'));

    fireEvent.press(monthCell);
    const dayCell = await waitForElement(() => component.queryByText('7'));

    fireEvent.press(dayCell);
  });

  it('should be rendered with view passed to startView prop', () => {
    const componentRef = React.createRef<Calendar>();
    render(
      <TestCalendar
        ref={componentRef}
        startView={CalendarViewModes.YEAR}
      />,
    );

    expect(componentRef.current.state.viewMode).toEqual(CalendarViewModes.YEAR);
  });

  it('should change month to next when navigation button pressed', () => {
    const componentRef = React.createRef<Calendar>();
    const component = render(
      <TestCalendar ref={componentRef} />,
    );

    const initialDate = componentRef.current.state.visibleDate;
    const navigationNextButton = component.queryAllByType(TouchableOpacity)[2];

    fireEvent.press(navigationNextButton);

    const nextMonth = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, initialDate.getDate());

    expect(componentRef.current.state.visibleDate).toEqual(nextMonth);
  });

  it('should change month to previous when navigation button pressed', () => {
    const componentRef = React.createRef<Calendar>();
    const component = render(
      <TestCalendar ref={componentRef} />,
    );

    const initialDate = componentRef.current.state.visibleDate;
    const navigationPrevButton = component.queryAllByType(TouchableOpacity)[1];

    fireEvent.press(navigationPrevButton);

    const previousMonth = new Date(initialDate.getFullYear(), initialDate.getMonth() - 1, initialDate.getDate());

    expect(componentRef.current.state.visibleDate).toEqual(previousMonth);
  });

  it('should change year to next when navigation button pressed', () => {
    const componentRef = React.createRef<Calendar>();
    const component = render(
      <TestCalendar
        ref={componentRef}
        startView={CalendarViewModes.YEAR}
      />,
    );

    const initialDate = componentRef.current.state.visibleDate;
    const navigationPrevButton = component.queryAllByType(TouchableOpacity)[2];

    fireEvent.press(navigationPrevButton);

    const nextYear = new Date(initialDate.getFullYear() + 12, initialDate.getMonth(), initialDate.getDate());

    expect(componentRef.current.state.visibleDate).toEqual(initialDate);
    expect(componentRef.current.state.pickerDate).toEqual(nextYear);
  });

  it('should change year to previous when navigation button pressed', () => {
    const componentRef = React.createRef<Calendar>();
    const component = render(
      <TestCalendar
        ref={componentRef}
        startView={CalendarViewModes.YEAR}
      />,
    );

    const initialDate = componentRef.current.state.visibleDate;
    const navigationPrevButton = component.queryAllByType(TouchableOpacity)[1];

    fireEvent.press(navigationPrevButton);

    const nextYear = new Date(initialDate.getFullYear() - 12, initialDate.getMonth(), initialDate.getDate());

    expect(componentRef.current.state.visibleDate).toEqual(initialDate);
    expect(componentRef.current.state.pickerDate).toEqual(nextYear);
  });

  it('should show the selected date on load provided by date prop', () => {
    const date = new Date(2021, 2, 1);
    const componentRef = React.createRef<Calendar>();
    render(
      <TestCalendar
        ref={componentRef}
        date={date}
      />,
    );

    const visibleDate = componentRef.current.state.visibleDate;
    expect(visibleDate.getFullYear()).toEqual(date.getFullYear());
    expect(visibleDate.getMonth()).toEqual(date.getMonth());
  });

  it('should show the specific date on load provided by initialVisibleDate prop', () => {
    const initialDate = new Date(2021, 2, 1);
    const componentRef = React.createRef<Calendar>();
    render(
      <TestCalendar
        ref={componentRef}
        date={new Date()}
        initialVisibleDate={initialDate}
      />,
    );

    const visibleDate = componentRef.current.state.visibleDate;
    expect(visibleDate.getFullYear()).toEqual(initialDate.getFullYear());
    expect(visibleDate.getMonth()).toEqual(initialDate.getMonth());
  });

  it('should scroll to current month when scrollToToday called', () => {
    const componentRef = React.createRef<Calendar>();
    render(
      <TestCalendar
        ref={componentRef}
        date={new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())}
      />,
    );

    componentRef.current.scrollToToday();

    expect(componentRef.current.state.visibleDate.getMonth()).toEqual(today.getMonth());
  });

  it('should scroll to the specific date when scrollToDate called', () => {
    const dateToScroll = new Date(2021, 2, 1);
    const componentRef = React.createRef<Calendar>();
    render(
      <TestCalendar
        ref={componentRef}
        date={new Date()}
      />,
    );

    componentRef.current.scrollToDate(dateToScroll);

    const visibleDate = componentRef.current.state.visibleDate;
    expect(visibleDate.getFullYear()).toEqual(dateToScroll.getFullYear());
    expect(visibleDate.getMonth()).toEqual(dateToScroll.getMonth());
  });

  it('should render element provided with renderDay prop', async () => {
    const component = render(
      <TestCalendar renderDay={() => <View testID='@calendar/cell' />} />,
    );

    const cells = component.queryAllByTestId('@calendar/cell');
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderMonth prop', async () => {
    const component = render(
      <TestCalendar
        startView={CalendarViewModes.MONTH}
        renderMonth={() => <View testID='@calendar/cell' />}
      />,
    );

    const cells = component.queryAllByTestId('@calendar/cell');
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderYear prop', async () => {
    const component = render(
      <TestCalendar
        startView={CalendarViewModes.YEAR}
        renderYear={() => <View testID='@calendar/cell' />}
      />,
    );

    const cells = component.queryAllByTestId('@calendar/cell');
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderFooter prop', async () => {
    const component = render(
      <TestCalendar
        startView={CalendarViewModes.YEAR}
        renderFooter={() => <View testID='@calendar/footer' />}
      />,
    );

    expect(component.queryByTestId('@calendar/footer')).toBeTruthy();
  });

  it('should work with Moment', async () => {
    const dateService = new MomentDateService();
    const onSelect = jest.fn((moment: Moment) => {
      expect(moment.toDate).toBeTruthy();
    });

    const component = render(
      <TestCalendar
        dateService={dateService}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(component.getByText('7'));
  });

  it('should call onMonthChange function', async () => {

    const onVisibleDateChange = jest.fn();

    const component = render(
      <TestCalendar onVisibleDateChange={onVisibleDateChange} />,
    );

    const navigationPrevButton = component.queryAllByType(TouchableOpacity)[1];
    const navigationNextButton = component.queryAllByType(TouchableOpacity)[2];

    fireEvent.press(navigationPrevButton);
    expect(onVisibleDateChange).toBeCalledTimes(1);

    fireEvent.press(navigationNextButton);
    expect(onVisibleDateChange).toBeCalledTimes(2);

  });

  it('should render custom left arrow', () => {
    const onVisibleDateChange = jest.fn();

    const renderArrow = (props: { onPress: () => void }): React.ReactElement => {
      return (
        <TouchableOpacity
          testID='@arrow/left'
          onPress={props.onPress}
        >
          <Text>
            LEFT
          </Text>
        </TouchableOpacity>
      );
    };

    const component = render(
      <TestCalendar
        renderArrowLeft={renderArrow}
        onVisibleDateChange={onVisibleDateChange}
      />
    );

    const leftArrow = component.queryByTestId('@arrow/left');
    fireEvent.press(leftArrow);

    expect(onVisibleDateChange).toBeCalled();
  });

  it('should render custom right arrow', () => {
    const onVisibleDateChange = jest.fn();

    const renderArrow = (props: { onPress: () => void }): React.ReactElement => {
      return (
        <TouchableOpacity
          testID='@arrow/right'
          onPress={props.onPress}
        >
          <Text>
            RIGHT
          </Text>
        </TouchableOpacity>
      );
    };

    const component = render(
      <TestCalendar
        renderArrowRight={renderArrow}
        onVisibleDateChange={onVisibleDateChange}
      />
    );

    const leftArrow = component.queryByTestId('@arrow/right');
    fireEvent.press(leftArrow);

    expect(onVisibleDateChange).toBeCalled();
  });

});
