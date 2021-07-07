/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitForElement,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  RangeDatepicker,
  RangeDatepickerProps,
} from './RangeDatepicker.component';
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
      props.onSelect && props.onSelect(nextRange);
    };

    return (
      <ApplicationProvider mapping={mapping} theme={light}>
        <RangeDatepicker
          ref={ref}
          {...props}
          range={range}
          onSelect={onSelect}
        />
      </ApplicationProvider>
    );
  });

  /*
   * In this test:
   * [0] for input touchable
   * [1] for backdrop
   * ...rest for calendar touchable components
   */
  const touchables = {
    findInputTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[0],
    findBackdropTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[1],
  };

  it('should not render range calendar when not focused', () => {
    const component = render(
      <TestRangeDatepicker/>,
    );

    expect(component.queryByType(RangeCalendar)).toBeFalsy();
  });

  it('should render range calendar when becomes focused', async () => {
    const component = render(
      <TestRangeDatepicker/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const calendar = await waitForElement(() => component.queryByType(RangeCalendar));
    expect(calendar).toBeTruthy();
  });

  it('should render label as string', async () => {
    const component = render(
      <TestRangeDatepicker label='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as component', async () => {
    const component = render(
      <TestRangeDatepicker label={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as pure JSX component', async () => {
    const component = render(
      <TestRangeDatepicker label={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as string', async () => {
    const component = render(
      <TestRangeDatepicker caption='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as component', async () => {
    const component = render(
      <TestRangeDatepicker caption={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption', async () => {
    const component = render(
      <TestRangeDatepicker caption={props => <View {...props} testID='caption icon'/>}/>,
    );

    expect(component.queryByTestId('caption icon')).toBeTruthy();
  });

  it('should render caption as pure JSX component', async () => {
    const component = render(
      <TestRangeDatepicker caption={<View testID='caption icon'/>}/>,
    );

    expect(component.queryByTestId('caption icon')).toBeTruthy();
  });

  it('should render component passed to accessoryLeft prop', async () => {
    const component = render(
      <TestRangeDatepicker accessoryLeft={props => <View {...props} testID='accessory left'/>}/>,
    );

    expect(component.queryByTestId('accessory left')).toBeTruthy();
  });

  it('should render pure JSX component passed to accessoryLeft prop', async () => {
    const component = render(
      <TestRangeDatepicker accessoryLeft={<View testID='accessory left'/>}/>,
    );

    expect(component.queryByTestId('accessory left')).toBeTruthy();
  });

  it('should render component passed to accessoryRight prop', async () => {
    const component = render(
      <TestRangeDatepicker accessoryRight={props => <View {...props} testID='accessory right'/>}/>,
    );

    expect(component.queryByTestId('accessory right')).toBeTruthy();
  });

  it('should render pure JSX component passed to accessoryRight prop', async () => {
    const component = render(
      <TestRangeDatepicker accessoryRight={<View testID='accessory right'/>}/>,
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
      <TestRangeDatepicker onSelect={onSelect}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const dateTouchable = await waitForElement(() => component.queryAllByText('7')[0]);
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

    const dateTouchable = await waitForElement(() => component.queryAllByText('8')[0]);
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

    const dateTouchable = await waitForElement(() => component.queryAllByText('7')[0]);
    fireEvent.press(dateTouchable);
  });

  it('should render element provided with renderDay prop', async () => {
    const component = render(
      <TestRangeDatepicker renderDay={() => <View testID='@range-datepicker/cell'/>}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const cells = await waitForElement(() => component.queryAllByTestId('@range-datepicker/cell'));
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderMonth prop', async () => {
    const component = render(
      <TestRangeDatepicker
        startView={CalendarViewModes.MONTH}
        renderMonth={() => <View testID='@range-datepicker/cell'/>}
      />,
    );

    fireEvent.press(component.queryAllByType(TouchableOpacity)[0]);

    const cells = await waitForElement(() => component.queryAllByTestId('@range-datepicker/cell'));
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderYear prop', async () => {
    const component = render(
      <TestRangeDatepicker
        startView={CalendarViewModes.YEAR}
        renderYear={() => <View testID='@range-datepicker/cell'/>}
      />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const cells = await waitForElement(() => component.queryAllByTestId('@range-datepicker/cell'));
    expect(cells.length).not.toEqual(0);
  });

  it('should hide calendar when backdrop pressed', async () => {
    const component = render(
      <TestRangeDatepicker/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));
    fireEvent.press(backdrop);

    const calendar = await waitForElement(() => component.queryByType(RangeCalendar));
    expect(calendar).toBeFalsy();
  });

  it('should call onFocus when calendar becomes visible', async () => {
    const onFocus = jest.fn();
    const component = render(
      <TestRangeDatepicker onFocus={onFocus}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    await waitForElement(() => null);
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur when calendar becomes invisible', async () => {
    const onBlur = jest.fn();
    const component = render(
      <TestRangeDatepicker onBlur={onBlur}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));
    fireEvent.press(backdrop);

    expect(onBlur).toBeCalled();
  });

  it('should show calendar by calling `show` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    const component = render(
      <TestRangeDatepicker ref={componentRef}/>,
    );

    componentRef.current.show();
    const calendar = await waitForElement(() => component.queryByType(RangeCalendar));

    expect(calendar).toBeTruthy();
  });

  it('should hide calendar by calling `hide` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    const component = render(
      <TestRangeDatepicker ref={componentRef}/>,
    );

    componentRef.current.show();
    await waitForElement(() => null);

    componentRef.current.hide();
    const calendar = await waitForElement(() => component.queryByType(RangeCalendar));

    expect(calendar).toBeFalsy();
  });

  it('should show calendar by calling `focus` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    const component = render(
      <TestRangeDatepicker ref={componentRef}/>,
    );

    componentRef.current.focus();
    const calendar = await waitForElement(() => component.queryByType(RangeCalendar));

    expect(calendar).toBeTruthy();
  });

  it('should hide calendar by calling `blur` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    const component = render(
      <TestRangeDatepicker ref={componentRef}/>,
    );

    componentRef.current.focus();
    await waitForElement(() => null);

    componentRef.current.blur();
    const calendar = await waitForElement(() => component.queryByType(RangeCalendar));

    expect(calendar).toBeFalsy();
  });

  it('should return false if calendar not visible by calling `isFocused` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    render(
      <TestRangeDatepicker ref={componentRef}/>,
    );

    expect(componentRef.current.isFocused()).toEqual(false);
  });

  it('should return true if calendar visible by calling `isFocused` with ref', async () => {
    const componentRef: React.RefObject<RangeDatepicker> = React.createRef();
    render(
      <TestRangeDatepicker ref={componentRef}/>,
    );

    componentRef.current.focus();
    await waitForElement(() => null);

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
    await waitForElement(() => null);

    expect(onSelect).toBeCalledWith({});
  });

  it('should call onPress', async () => {
    const onPress = jest.fn();
    const component = render(
      <TestRangeDatepicker onPress={onPress}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));
    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', async () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestRangeDatepicker onPressIn={onPressIn}/>,
    );

    fireEvent(touchables.findInputTouchable(component), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', async () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestRangeDatepicker onPressOut={onPressOut}/>,
    );

    fireEvent(touchables.findInputTouchable(component), 'pressOut');
    expect(onPressOut).toBeCalled();
  });

});
