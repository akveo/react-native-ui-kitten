/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
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
  CheckBox,
  CheckBoxProps,
} from './checkbox.component';

describe('@checkbox component checks', () => {

  const TestCheckBox = (props?: CheckBoxProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <CheckBox {...props} />
    </ApplicationProvider>
  );

  it('should request checking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestCheckBox
        checked={false}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(true, false);
  });

  it('should request unchecking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestCheckBox
        checked={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(false, false);
  });

  it('should request clearing indeterminate and checking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestCheckBox
        checked={false}
        indeterminate={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(true, false);
  });

  it('should request clearing indeterminate and unchecking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestCheckBox
        checked={true}
        indeterminate={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(false, false);
  });

  it('should render text', () => {
    const component = render(
      <TestCheckBox>I love Babel</TestCheckBox>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text as component', () => {
    const component = render(
      <TestCheckBox>
        {props => <Text {...props}>I love Babel</Text>}
      </TestCheckBox>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render ReactElement passed to prop', () => {
    const renderComponent = <Text>I love Babel</Text>;

    const component = render(
      <TestCheckBox>
        {renderComponent}
      </TestCheckBox>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  })

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestCheckBox onPressIn={onPressIn}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestCheckBox onPressOut={onPressOut}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toBeCalled();
  });

  it('should call onMouseEnter', () => {
    const onMouseEnter = jest.fn();

    const component = render(
      <TestCheckBox onMouseEnter={onMouseEnter}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'mouseEnter');
    expect(onMouseEnter).toBeCalled();
  });

  it('should call onMouseLeave', () => {
    const onMouseLeave = jest.fn();

    const component = render(
      <TestCheckBox onMouseLeave={onMouseLeave}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'mouseLeave');
    expect(onMouseLeave).toBeCalled();
  });

  it('should call onFocus', () => {
    const onFocus = jest.fn();

    const component = render(
      <TestCheckBox onFocus={onFocus}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'focus');
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur', () => {
    const onBlur = jest.fn();

    const component = render(
      <TestCheckBox onBlur={onBlur}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'blur');
    expect(onBlur).toBeCalled();
  });

});
