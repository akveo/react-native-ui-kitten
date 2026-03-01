/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  act,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  RangeDatepicker,
  RangeDatepickerProps,
} from './rangeDatepicker.component';
import { RangeCalendar } from '../calendar/rangeCalendar.component';
import {
  CalendarRange,
  CalendarViewModes,
} from '../calendar/type';

jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');

  ActualReactNative.UIManager.measureInWindow = (node, callback) => {
    callback(0, 0, 42, 42);
  };

  return ActualReactNative;
});

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

describe('@range-datepicker: component checks', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  const TestRangeDatepicker = React.forwardRef((props: Partial<RangeDatepickerProps>,
    ref: React.Ref<RangeDatepicker>) => {
    const [range, setRange] = React.useState(props.range || {});

    const onSelect = (nextRange: CalendarRange<Date>): void => {
      setRange(nextRange);
      props.onSelect?.(nextRange);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <RangeDatepicker
          ref={ref}
          {...props}
          range={range}
          onSelect={onSelect}
        />
      </ApplicationProvider>
    );
  });

  TestRangeDatepicker.displayName = 'TestRangeDatepicker';

  /*
   * In this test:
   * [0] for input touchable
   * ...rest for calendar touchable components
   */
  const touchables = {
    findInputTouchable: (api: RenderAPI) => api.UNSAFE_queryAllByType(TouchableOpacity)[0],
    findBackdropTouchable: (api: RenderAPI) => api.queryByTestId('@backdrop'),
  };

  it('should not render range calendar when not focused', () => {
    const component = render(
      <TestRangeDatepicker />,
    );

    expect(component.UNSAFE_queryByType(RangeCalendar)).toBeFalsy();
  });

  it('should render range calendar when becomes focused', async () => {
    const component = render(
      <TestRangeDatepicker />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const calendar = await waitFor(() => component.UNSAFE_queryByType(RangeCalendar));
    expect(calendar).toBeTruthy();
  });

  it('should render label as string', async () => {
    const component = render(
      <TestRangeDatepicker label='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as component', async () => {
    const component = render(
      <TestRangeDatepicker label={props => (
        <Text {...props}>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as pure JSX component', async () => {
    const component = render(
      <TestRangeDatepicker label={(
        <Text>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as string', async () => {
    const component = render(
      <TestRangeDatepicker caption='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as component', async () => {
    const component = render(
      <TestRangeDatepicker caption={props => (
        <Text {...props}>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption', async () => {
    const component = render(
      <TestRangeDatepicker caption={props => (
        <View
          {...props}
          testID='caption icon'
        />
      )}
      />,
    );

    expect(component.queryByTestId('caption icon')).toBeTruthy();
  });

  it('should render caption as pure JSX component', async () => {
    const component = render(
      <TestRangeDatepicker caption={<View testID='caption icon' />} />,
    );

    expect(component.queryByTestId('caption icon')).toBeTruthy();
  });

  it('should render component passed to accessoryLeft prop', async () => {
    const component = render(
      <TestRangeDatepicker accessoryLeft={props => (
        <View
          {...props}
          testID='accessory left'
        />
      )}
      />,
    );

    expect(component.queryByTestId('accessory left')).toBeTruthy();
  });

  it('should render pure JSX component passed to accessoryLeft prop', async () => {
    const component = render(
      <TestRangeDatepicker accessoryLeft={<View testID='accessory left' />} />,
    );

    expect(component.queryByTestId('accessory left')).toBeTruthy();
  });

  it('should render component passed to accessoryRight prop', async () => {
    const component = render(
      <TestRangeDatepicker accessoryRight={props => (
        <View
          {...props}
          testID='accessory right'
        />
      )}
      />,
    );

    expect(component.queryByTestId('accessory right')).toBeTruthy();
  });

  it('should render pure JSX component passed to accessoryRight prop', async () => {
    const component = render(
      <TestRangeDatepicker accessoryRight={<View testID='accessory right' />} />,
    );

    expect(component.queryByTestId('accessory right')).toBeTruthy();
  });

  it('should call onSelect only with start date', async () => {
    const onSelect = jest.fn((range: CalendarRange<Date>) => {
      expect(range).toEqual({
        startDate: new Date(today.getFullYear(), today.getMonth(), 7),
        endDate: null,
      });
    });

    const component = render(
      <TestRangeDatepicker onSelect={onSelect} />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const dateTouchable = await waitFor(() => component.queryAllByText('7')[0]);
    fireEvent.press(dateTouchable);
  });

  it('should call onSelect with start and end dates if start date passed to props', async () => {
    const onSelect = jest.fn((range: CalendarRange<Date>) => {
      expect(range).toEqual({
        startDate: new Date(today.getFullYear(), today.getMonth(), 7),
        endDate: new Date(today.getFullYear(), today.getMonth(), 8),
      });
    });

    const component = render(
      <TestRangeDatepicker
        range={{ startDate: new Date(today.getFullYear(), today.getMonth(), 7) }}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const dateTouchable = await waitFor(() => component.queryAllByText('8')[0]);
    fireEvent.press(dateTouchable);
  });

  it('should call onSelect only with start date if start and end dates passed to props', async () => {
    const onSelect = jest.fn((range: CalendarRange<Date>) => {
      expect(range).toEqual({
        startDate: new Date(today.getFullYear(), today.getMonth(), 7),
        endDate: null,
      });
    });

    const initialRange: CalendarRange<Date> = {
      startDate: new Date(today.getFullYear(), today.getMonth(), 7),
      endDate: new Date(today.getFullYear(), today.getMonth(), 8),
    };

    const component = render(
      <TestRangeDatepicker
        range={initialRange}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const dateTouchable = await waitFor(() => component.queryAllByText('7')[0]);
    fireEvent.press(dateTouchable);
  });

  it('should render element provided with renderDay prop', async () => {
    const component = render(
      <TestRangeDatepicker renderDay={() => <View testID='@range-datepicker/cell' />} />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const cells = await waitFor(() => component.queryAllByTestId('@range-datepicker/cell'));
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderMonth prop', async () => {
    const component = render(
      <TestRangeDatepicker
        startView={CalendarViewModes.MONTH}
        renderMonth={() => <View testID='@range-datepicker/cell' />}
      />,
    );

    fireEvent.press(component.UNSAFE_queryAllByType(TouchableOpacity)[0]);

    const cells = await waitFor(() => component.queryAllByTestId('@range-datepicker/cell'));
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderYear prop', async () => {
    const component = render(
      <TestRangeDatepicker
        startView={CalendarViewModes.YEAR}
        renderYear={() => <View testID='@range-datepicker/cell' />}
      />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const cells = await waitFor(() => component.queryAllByTestId('@range-datepicker/cell'));
    expect(cells.length).not.toEqual(0);
  });

  it('should hide calendar when backdrop pressed', async () => {
    const component = render(
      <TestRangeDatepicker />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const backdrop = await waitFor(() => {
      const el = touchables.findBackdropTouchable(component);
      expect(el).toBeTruthy();
      return el;
    });
    // Backdrop uses PanResponder - call the handler directly
    const responderRelease = backdrop.props.onResponderRelease;
    await act(async () => {
      responderRelease?.({ nativeEvent: {} });
    });

    await waitFor(() => {
      expect(component.UNSAFE_queryByType(RangeCalendar)).toBeFalsy();
    });
  });

  it('should call onFocus when calendar becomes visible', async () => {
    const onFocus = jest.fn();
    const component = render(
      <TestRangeDatepicker onFocus={onFocus} />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    await waitFor(() => null);
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur when calendar becomes invisible', async () => {
    const onBlur = jest.fn();
    const component = render(
      <TestRangeDatepicker onBlur={onBlur} />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const backdrop = await waitFor(() => touchables.findBackdropTouchable(component));
    // Backdrop uses PanResponder - call the handler directly
    const responderRelease = backdrop.props.onResponderRelease;
    if (responderRelease) {
      responderRelease({ nativeEvent: {} });
    }

    expect(onBlur).toBeCalled();
  });

  it('should show calendar by calling `focus` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    const component = render(
      <TestRangeDatepicker ref={componentRef} />,
    );

    componentRef.current.focus();
    await waitFor(() => {
      expect(component.UNSAFE_queryByType(RangeCalendar)).toBeTruthy();
    });
  });

  it('should hide calendar by calling `blur` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    const component = render(
      <TestRangeDatepicker ref={componentRef} />,
    );

    componentRef.current.focus();
    await waitFor(() => {
      expect(component.UNSAFE_queryByType(RangeCalendar)).toBeTruthy();
    });

    await act(async () => {
      componentRef.current.blur();
    });
    await waitFor(() => {
      expect(component.UNSAFE_queryByType(RangeCalendar)).toBeFalsy();
    });
  });

  it('should return false if calendar not visible by calling `isFocused` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    render(
      <TestRangeDatepicker ref={componentRef} />,
    );

    expect(componentRef.current.isFocused()).toEqual(false);
  });

  it('should return true if calendar visible by calling `isFocused` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    render(
      <TestRangeDatepicker ref={componentRef} />,
    );

    componentRef.current.focus();
    await waitFor(() => null);

    expect(componentRef.current.isFocused()).toEqual(true);
  });

  it('should call onSelect with empty object when calling `clear` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    const onSelect = jest.fn();

    render(
      <TestRangeDatepicker
        ref={componentRef}
        onSelect={onSelect}
      />,
    );

    componentRef.current.clear();
    await waitFor(() => null);

    expect(onSelect).toBeCalledWith({});
  });

  it('should call onPress', async () => {
    const onPress = jest.fn();
    const component = render(
      <TestRangeDatepicker onPress={onPress} />,
    );

    fireEvent.press(touchables.findInputTouchable(component));
    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', async () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestRangeDatepicker onPressIn={onPressIn} />,
    );

    fireEvent(touchables.findInputTouchable(component), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', async () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestRangeDatepicker onPressOut={onPressOut} />,
    );

    fireEvent(touchables.findInputTouchable(component), 'pressOut');
    expect(onPressOut).toBeCalled();
  });

  it('should show startDate of the selected range on load provided by range prop', async () => {
    const date = new Date(2021, 2, 1);
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();

    render(
      <TestRangeDatepicker
        ref={componentRef}
        range={{
          startDate: date,
          endDate: new Date(2021, 3, 1),
        }}
      />,
    );

    componentRef.current.focus();
    await waitFor(() => {
      expect(componentRef.current.isFocused()).toBe(true);
    });

    const visibleDate = componentRef.current.getCalendarVisibleDate();
    expect(visibleDate.getFullYear()).toEqual(date.getFullYear());
    expect(visibleDate.getMonth()).toEqual(date.getMonth());
  });

  it('should show the specific date on load provided by initialVisibleDate prop', async () => {
    const initialDate = new Date(2021, 2, 1);
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();

    render(
      <TestRangeDatepicker
        ref={componentRef}
        initialVisibleDate={initialDate}
      />,
    );

    componentRef.current.focus();
    await waitFor(() => {
      expect(componentRef.current.isFocused()).toBe(true);
    });

    const visibleDate = componentRef.current.getCalendarVisibleDate();
    expect(visibleDate.getFullYear()).toEqual(initialDate.getFullYear());
    expect(visibleDate.getMonth()).toEqual(initialDate.getMonth());
  });

  it('should scroll to current month when scrollToToday called', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();

    render(
      <TestRangeDatepicker
        ref={componentRef}
        initialVisibleDate={new Date(2021, 2, 1)}
      />,
    );

    componentRef.current.focus();
    await waitFor(() => {
      expect(componentRef.current.isFocused()).toBe(true);
    });
    componentRef.current.scrollToToday();
    await waitFor(() => null);

    const visibleDate = componentRef.current.getCalendarVisibleDate();
    expect(visibleDate.getFullYear()).toEqual(today.getFullYear());
    expect(visibleDate.getMonth()).toEqual(today.getMonth());
  });

  it('should scroll to the specific date when scrollToDate called', async () => {
    const dateToScroll = new Date(2020, 1, 1);
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();

    render(
      <TestRangeDatepicker
        ref={componentRef}
        initialVisibleDate={new Date(2021, 2, 1)}
      />,
    );

    componentRef.current.focus();
    await waitFor(() => {
      expect(componentRef.current.isFocused()).toBe(true);
    });
    componentRef.current.scrollToDate(dateToScroll);
    await waitFor(() => null);

    const visibleDate = componentRef.current.getCalendarVisibleDate();
    expect(visibleDate.getFullYear()).toEqual(dateToScroll.getFullYear());
    expect(visibleDate.getMonth()).toEqual(dateToScroll.getMonth());
  });

  it('should render custom left arrow', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();

    const onVisibleDateChange = jest.fn();

    const renderArrow = (props: { onPress: () => void }): React.ReactElement => {
      return (
        <TouchableOpacity
          testID="@arrow/left"
          onPress={props.onPress}
        >
          <Text>
            LEFT
          </Text>
        </TouchableOpacity>
      );
    };

    const component = render(
      <TestRangeDatepicker
        ref={componentRef}
        renderArrowLeft={renderArrow}
        onVisibleDateChange={onVisibleDateChange}
      />
    );

    componentRef.current?.focus();

    const leftArrow = await waitFor(() => {
      const el = component.queryByTestId('@arrow/left');
      expect(el).toBeTruthy();
      return el;
    });
    fireEvent.press(leftArrow);

    expect(onVisibleDateChange).toBeCalled();
  });

  it('should render custom right arrow', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();

    const onVisibleDateChange = jest.fn();

    const renderArrow = (props: { onPress: () => void }): React.ReactElement => {
      return (
        <TouchableOpacity
          testID="@arrow/right"
          onPress={props.onPress}
        >
          <Text>
            RIGHT
          </Text>
        </TouchableOpacity>
      );
    };

    const component = render(
      <TestRangeDatepicker
        ref={componentRef}
        renderArrowRight={renderArrow}
        onVisibleDateChange={onVisibleDateChange}
      />
    );

    componentRef.current?.focus();

    const rightArrow = await waitFor(() => {
      const el = component.queryByTestId('@arrow/right');
      expect(el).toBeTruthy();
      return el;
    });
    fireEvent.press(rightArrow);

    expect(onVisibleDateChange).toBeCalled();
  });

});
