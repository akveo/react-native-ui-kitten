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
  Datepicker,
  DatepickerProps,
} from './datepicker.component';
import { Calendar } from '../calendar/calendar.component';
import { CalendarViewModes } from '../calendar/type';

jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');

  ActualReactNative.UIManager.measureInWindow = (node, callback) => {
    callback(0, 0, 42, 42);
  };

  return ActualReactNative;
});

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

describe('@datepicker: component checks', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  const TestDatepicker = React.forwardRef((props: Partial<DatepickerProps>, ref: React.Ref<Datepicker>) => {
    const [date, setDate] = React.useState(props.date);

    const onSelect = (nextDate: Date): void => {
      setDate(nextDate);
      props.onSelect && props.onSelect(nextDate);
    };

    return (
      <ApplicationProvider mapping={mapping} theme={light}>
        <Datepicker
          ref={ref}
          date={date}
          {...props}
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

  it('should not render calendar when not focused', () => {
    const component = render(
      <TestDatepicker/>,
    );

    expect(component.queryByType(Calendar)).toBeFalsy();
  });

  it('should render calendar when becomes focused', async () => {
    const component = render(
      <TestDatepicker/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));
    const calendar = await waitForElement(() => component.queryByType(Calendar));

    expect(calendar).toBeTruthy();
  });

  it('should render label as string', async () => {
    const component = render(
      <TestDatepicker label='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as component', async () => {
    const component = render(
      <TestDatepicker label={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render placeholder as pure JSX component', async () => {
    const component = render(
      <TestDatepicker placeholder={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render placeholder as string', async () => {
    const component = render(
      <TestDatepicker placeholder='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render placeholder as component', async () => {
    const component = render(
      <TestDatepicker placeholder={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as pure JSX component', async () => {
    const component = render(
      <TestDatepicker label={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as string', async () => {
    const component = render(
      <TestDatepicker caption='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as component', async () => {
    const component = render(
      <TestDatepicker caption={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption', async () => {
    const component = render(
      <TestDatepicker caption={props => <View {...props} testID='caption icon'/>}/>,
    );

    expect(component.queryByTestId('caption icon')).toBeTruthy();
  });

  it('should render caption as pure JXS component', async () => {
    const component = render(
      <TestDatepicker caption={<View testID='caption icon'/>}/>,
    );

    expect(component.queryByTestId('caption icon')).toBeTruthy();
  });

  it('should render component passed to accessoryLeft prop', async () => {
    const component = render(
      <TestDatepicker accessoryLeft={props => <View {...props} testID='accessory left'/>}/>,
    );

    expect(component.queryByTestId('accessory left')).toBeTruthy();
  });

  it('should render pure JSX component passed to accessoryLeft prop', async () => {
    const component = render(
      <TestDatepicker accessoryLeft={<View testID='accessory left'/>}/>,
    );

    expect(component.queryByTestId('accessory left')).toBeTruthy();
  });

  it('should render component passed to accessoryRight prop', async () => {
    const component = render(
      <TestDatepicker accessoryRight={props => <View {...props} testID='accessory right'/>}/>,
    );

    expect(component.queryByTestId('accessory right')).toBeTruthy();
  });

  it('should render pure JSX component passed to accessoryRight prop', async () => {
    const component = render(
      <TestDatepicker accessoryRight={<View testID='accessory right'/>}/>,
    );

    expect(component.queryByTestId('accessory right')).toBeTruthy();
  });

  it('should request date change', async () => {
    const onSelect = jest.fn();
    const component = render(
      <TestDatepicker onSelect={onSelect}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));
    const dateTouchable = await waitForElement(() => component.queryAllByText('7')[0]);

    fireEvent.press(dateTouchable);
    expect(onSelect).toBeCalledWith(new Date(today.getFullYear(), today.getMonth(), 7));
  });

  it('should render element provided with renderDay prop', async () => {
    const component = render(
      <TestDatepicker renderDay={() => <View testID='@datepicker/cell'/>}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));
    const cells = await waitForElement(() => component.queryAllByTestId('@datepicker/cell'));

    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderMonth prop', async () => {
    const component = render(
      <TestDatepicker
        startView={CalendarViewModes.MONTH}
        renderMonth={() => <View testID='@datepicker/cell'/>}
      />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const cells = await waitForElement(() => component.queryAllByTestId('@datepicker/cell'));
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderYear prop', async () => {
    const component = render(
      <TestDatepicker
        startView={CalendarViewModes.YEAR}
        renderYear={() => <View testID='@datepicker/cell'/>}
      />,
    );

    fireEvent.press(touchables.findInputTouchable(component));
    const cells = await waitForElement(() => component.queryAllByTestId('@datepicker/cell'));

    expect(cells.length).not.toEqual(0);
  });

  it('should hide calendar when date pressed', async () => {
    const component = render(
      <TestDatepicker />,
    );

    fireEvent.press(touchables.findInputTouchable(component));
    const dateTouchable = await waitForElement(() => component.queryAllByText('7')[0]);

    fireEvent.press(dateTouchable);

    const calendar = await waitForElement(() => component.queryByType(Calendar));
    expect(calendar).toBeFalsy();
  });

  it('should not hide calendar when date pressed (autoDismiss)', async () => {
    const component = render(
      <TestDatepicker autoDismiss={false}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));
    const dateTouchable = await waitForElement(() => component.queryAllByText('7')[0]);

    fireEvent.press(dateTouchable);

    const calendar = await waitForElement(() => component.queryByType(Calendar));
    expect(calendar).toBeTruthy();
  });

  it('should hide calendar when backdrop pressed', async () => {
    const component = render(
      <TestDatepicker />,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));
    fireEvent.press(backdrop);

    const calendar = await waitForElement(() => component.queryByType(Calendar));
    expect(calendar).toBeFalsy();
  });

  it('should call onFocus when calendar becomes visible', async () => {
    const onFocus = jest.fn();
    const component = render(
      <TestDatepicker onFocus={onFocus}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    await waitForElement(() => null);

    expect(onFocus).toBeCalled();
  });

  it('should call onBlur when calendar becomes invisible', async () => {
    const onBlur = jest.fn();
    const component = render(
      <TestDatepicker onBlur={onBlur}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));

    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));
    fireEvent.press(backdrop);

    expect(onBlur).toBeCalled();
  });

  it('should show calendar by calling `show` with ref', async () => {
    const componentRef: React.RefObject<Datepicker> = React.createRef();
    const component = render(
      <TestDatepicker ref={componentRef}/>,
    );

    componentRef.current.show();
    const calendar = await waitForElement(() => component.queryByType(Calendar));

    expect(calendar).toBeTruthy();
  });

  it('should hide calendar by calling `hide` with ref', async () => {
    const componentRef: React.RefObject<Datepicker> = React.createRef();

    const component = render(
      <TestDatepicker ref={componentRef}/>,
    );

    componentRef.current.show();
    await waitForElement(() => null);

    componentRef.current.hide();
    const calendar = await waitForElement(() => component.queryByType(Calendar));

    expect(calendar).toBeFalsy();
  });

  it('should show calendar by calling `focus` with ref', async () => {
    const componentRef: React.RefObject<Datepicker> = React.createRef();

    const component = render(
      <TestDatepicker ref={componentRef}/>,
    );

    componentRef.current.focus();
    const calendar = await waitForElement(() => component.queryByType(Calendar));

    expect(calendar).toBeTruthy();
  });

  it('should hide calendar by calling `blur` with ref', async () => {
    const componentRef: React.RefObject<Datepicker> = React.createRef();

    const component = render(
      <TestDatepicker ref={componentRef}/>,
    );

    componentRef.current.focus();
    await waitForElement(() => null);

    componentRef.current.blur();
    const calendar = await waitForElement(() => component.queryByType(Calendar));

    expect(calendar).toBeFalsy();
  });

  it('should return false if calendar not visible by calling `isFocused` with ref', async () => {
    const componentRef: React.RefObject<Datepicker> = React.createRef();

    render(
      <TestDatepicker ref={componentRef}/>,
    );

    expect(componentRef.current.isFocused()).toEqual(false);
  });

  it('should return true if calendar visible by calling `isFocused` with ref', async () => {
    const componentRef: React.RefObject<Datepicker> = React.createRef();

    render(
      <TestDatepicker ref={componentRef}/>,
    );

    componentRef.current.focus();
    await waitForElement(() => null);

    expect(componentRef.current.isFocused()).toEqual(true);
  });

  it('should call onSelect with null when calling `clear` with ref', async () => {
    const componentRef: React.RefObject<Datepicker> = React.createRef();
    const onSelect = jest.fn();

    render(
      <TestDatepicker
        ref={componentRef}
        onSelect={onSelect}
      />,
    );

    componentRef.current.clear();
    await waitForElement(() => null);

    expect(onSelect).toBeCalledWith(null);
  });

  it('should call onPress', async () => {
    const onPress = jest.fn();
    const component = render(
      <TestDatepicker onPress={onPress}/>,
    );

    fireEvent.press(touchables.findInputTouchable(component));
    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', async () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestDatepicker onPressIn={onPressIn}/>,
    );

    fireEvent(touchables.findInputTouchable(component), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', async () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestDatepicker onPressOut={onPressOut}/>,
    );

    fireEvent(touchables.findInputTouchable(component), 'pressOut');
    expect(onPressOut).toBeCalled();
  });

});
