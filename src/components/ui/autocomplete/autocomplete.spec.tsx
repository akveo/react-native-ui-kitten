/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TextInput,
  TouchableOpacity,
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
  Autocomplete,
  AutocompleteProps,
} from './autocomplete.component';
import { ListItem } from '../list/listItem.component';

/*
 * Mock UIManager since Autocomplete relies on native measurements
 */
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');

  ActualReactNative.UIManager.measureInWindow = (node, callback) => {
    callback(0, 0, 42, 42);
  };

  return ActualReactNative;
});

describe('@autocomplete: component checks', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  const TestAutocomplete = React.forwardRef((props: Partial<AutocompleteProps>, ref: React.Ref<Autocomplete>) => {
    const [value, setValue] = React.useState(props.value);

    const onChangeText = (text: string): void => {
      setValue(text);

      if (props.onChangeText) {
        props.onChangeText(text);
      }
    };

    return (
      <ApplicationProvider mapping={mapping} theme={light}>
        <Autocomplete
          ref={ref}
          value={value}
          data={[{ title: 'Option 1' }, { title: 'Option 2' }]}
          {...props}
          onChangeText={onChangeText}
        />
      </ApplicationProvider>
    );
  });

  /*
   * In this test:
   * [0] for modal backdrop
   * ...rest for options
   */
  const touchables = {
    findBackdropTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[0],
    findOptionTouchable: (api: RenderAPI, index: number) => api.queryAllByType(TouchableOpacity)[index + 1],
  };

  it('should render TextInput', () => {
    const component = render(
      <TestAutocomplete/>,
    );

    expect(component.getByType(TextInput)).toBeTruthy();
  });

  it('should not render options when not focused', () => {
    const component = render(
      <TestAutocomplete/>,
    );

    expect(component.queryByText('Option 1')).toBeFalsy();
    expect(component.queryByText('Option 2')).toBeFalsy();
  });

  it('should render options when becomes focused', async () => {
    const component = render(
      <TestAutocomplete/>,
    );

    fireEvent(component.getByType(TextInput), 'focus');

    const firstOption = await waitForElement(() => component.queryByText('Option 1'));
    const secondOption = component.queryByText('Option 2');

    expect(firstOption).toBeTruthy();
    expect(secondOption).toBeTruthy();
  });

  it('should request text change', async () => {
    const onChangeText = jest.fn();

    const component = render(
      <TestAutocomplete onChangeText={onChangeText}/>,
    );

    fireEvent.changeText(component.getByType(TextInput), 'I love Babel');

    expect(onChangeText).toBeCalledWith('I love Babel');
  });

  it('should call onSelect when option is pressed', async () => {
    const onSelect = jest.fn();

    const component = render(
      <TestAutocomplete onSelect={onSelect}/>,
    );

    fireEvent(component.getByType(TextInput), 'focus');

    await waitForElement(() => component.queryByText('Option 1'));

    fireEvent.press(touchables.findOptionTouchable(component, 0));

    expect(onSelect).toBeCalledWith({ title: 'Option 1' });
  });

  it('should render placeholder options when `data` prop is falsy', async () => {
    const component = render(
      <TestAutocomplete
        data={undefined}
        placeholderData={[{ title: 'Placeholder Option' }]}
      />,
    );

    fireEvent(component.getByType(TextInput), 'focus');

    const placeholderOption = await waitForElement(() => component.queryByText('Placeholder Option'));

    expect(placeholderOption).toBeTruthy();
  });

  it('should render element provided with renderItem prop', async () => {
    const component = render(
      <TestAutocomplete renderItem={info => <ListItem title={`Custom ${info.item.title}`}/>}/>,
    );

    fireEvent(component.getByType(TextInput), 'focus');

    const firstOption = await waitForElement(() => component.queryByText('Custom Option 1'));
    const secondOption = component.queryByText('Custom Option 2');

    expect(firstOption).toBeTruthy();
    expect(secondOption).toBeTruthy();
  });

  it('should hide options when backdrop is pressed', async () => {
    const component = render(
      <TestAutocomplete/>,
    );

    fireEvent(component.getByType(TextInput), 'focus');

    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));
    fireEvent.press(backdrop);

    const firstOption = await waitForElement(() => touchables.findOptionTouchable(component, 0));
    const secondOption = component.queryByText('Option 2');

    expect(firstOption).toBeFalsy();
    expect(secondOption).toBeFalsy();
  });

  it('should call onFocus', async () => {
    const onFocus = jest.fn();

    const component = render(
      <TestAutocomplete onFocus={onFocus}/>,
    );

    fireEvent(component.getByType(TextInput), 'focus');

    expect(onFocus).toBeCalled();
  });

  it('should call onBlur', async () => {
    const onBlur = jest.fn();

    const component = render(
      <TestAutocomplete onBlur={onBlur}/>,
    );

    fireEvent(component.getByType(TextInput), 'blur');

    expect(onBlur).toBeCalled();
  });

  it('should be able to call focus with ref', async () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();

    render(
      <TestAutocomplete ref={componentRef}/>,
    );

    expect(componentRef.current.focus).toBeTruthy();
    componentRef.current.focus();
  });

  it('should be able to call blur with ref', async () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();

    render(
      <TestAutocomplete ref={componentRef}/>,
    );

    expect(componentRef.current.blur).toBeTruthy();
    componentRef.current.blur();
  });

  it('should be able to call isFocused with ref', () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();

    render(
      <TestAutocomplete ref={componentRef}/>,
    );

    expect(componentRef.current.isFocused).toBeTruthy();
    componentRef.current.isFocused();
  });

  it('should be able to call clear with ref', () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();

    render(
      <TestAutocomplete ref={componentRef}/>,
    );

    expect(componentRef.current.clear).toBeTruthy();
    componentRef.current.clear();
  });

  it('should be able to call show with ref', () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();

    render(
      <TestAutocomplete ref={componentRef}/>,
    );

    expect(componentRef.current.show).toBeTruthy();
    componentRef.current.show();
  });

  it('should be able to call hide with ref', () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();

    render(
      <TestAutocomplete ref={componentRef}/>,
    );

    expect(componentRef.current.hide).toBeTruthy();
    componentRef.current.hide();
  });

});
