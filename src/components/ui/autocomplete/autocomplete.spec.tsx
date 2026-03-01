/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  ImageProps,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Autocomplete,
  AutocompleteProps,
} from './autocomplete.component';
import {
  AutocompleteItem,
  AutocompleteItemProps,
} from './autocompleteItem.component';
import { TouchableWithoutFeedback } from '../../devsupport';

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

describe('@autocomplete-item: component checks', () => {

  const TestAutocompleteItem = (props?: AutocompleteItemProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <AutocompleteItem {...props} />
    </ApplicationProvider>
  );

  it('should render text passed to title prop', () => {
    const component = render(
      <TestAutocompleteItem title='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to title prop', () => {
    const component = render(
      <TestAutocompleteItem title={props => (
        <Text {...props}>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text passed to description prop', () => {
    const component = render(
      <TestAutocompleteItem description='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to description prop', () => {
    const component = render(
      <TestAutocompleteItem description={props => (
        <Text {...props}>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render components passed to accessoryLeft or accessoryRight props', () => {
    const AccessoryLeft = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const AccessoryRight = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}
      />
    );

    const component = render(
      <TestAutocompleteItem
        accessoryLeft={AccessoryLeft}
        accessoryRight={AccessoryRight}
      />,
    );

    const [accessoryLeft, accessoryRight] = component.UNSAFE_queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should call onPress', () => {
    const onPress = jest.fn();
    const component = render(
      <TestAutocompleteItem onPress={onPress} />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableOpacity));
    expect(onPress).toHaveBeenCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestAutocompleteItem onPressIn={onPressIn} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestAutocompleteItem onPressOut={onPressOut} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toBeCalled();
  });
});

describe('@autocomplete: component checks', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  const movies = [
    { title: 'Option 1' },
    { title: 'Option 2' },
  ];

  const filter = (item, query): { title: string } => item.title.toLowerCase().includes(query.toLowerCase());

  const TestAutocomplete = React.forwardRef((props: Partial<AutocompleteProps>, ref: React.Ref<Autocomplete>) => {
    const [value, setValue] = React.useState(props.value);
    const [data, setData] = React.useState(movies);

    const onSelect = (index: number): void => {
      setValue(movies[index].title);
      props.onSelect?.(index);
    };

    const onChangeText = (query: string): void => {
      setValue(query);
      setData(movies.filter(item => filter(item, query)));
      props.onChangeText?.(query);
    };

    const renderOption = (item, index): React.ReactElement => (
      <AutocompleteItem
        key={index}
        title={item.title}
      />
    );

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <Autocomplete
          ref={ref}
          {...props}
          value={value}
          onSelect={onSelect}
          onChangeText={onChangeText}
        >
          {data.map(renderOption)}
        </Autocomplete>
      </ApplicationProvider>
    );
  });

  TestAutocomplete.displayName = 'TestAutocomplete';

  it('should render TextInput', () => {
    const component = render(
      <TestAutocomplete />,
    );

    expect(component.UNSAFE_queryByType(TextInput)).toBeTruthy();
  });

  it('should render placeholder', () => {
    const component = render(
      <TestAutocomplete placeholder='I love Babel' />,
    );

    expect(component.queryByPlaceholderText('I love Babel')).toBeTruthy();
  });

  it('should not render options when not focused', () => {
    const component = render(
      <TestAutocomplete />,
    );

    expect(component.queryByText('Option 1')).toBeFalsy();
    expect(component.queryByText('Option 2')).toBeFalsy();
  });

  it('should render options when becomes focused', async () => {
    const component = render(
      <TestAutocomplete />,
    );

    fireEvent(component.UNSAFE_queryByType(TextInput), 'focus');
    const firstOption = await waitFor(() => component.queryByText('Option 1'));
    const secondOption = component.queryByText('Option 2');

    expect(firstOption).toBeTruthy();
    expect(secondOption).toBeTruthy();
  });

  it('should request text change', async () => {
    const onChangeText = jest.fn();
    const component = render(
      <TestAutocomplete onChangeText={onChangeText} />,
    );

    fireEvent.changeText(component.UNSAFE_queryByType(TextInput), 'I love Babel');
    expect(onChangeText).toBeCalledWith('I love Babel');
  });

  it('should update options list on text change', async () => {
    const component = render(
      <TestAutocomplete />,
    );

    fireEvent(component.UNSAFE_queryByType(TextInput), 'focus');
    await waitFor(() => expect(component.queryByText('Option 1')).toBeTruthy());

    // After options are shown, there may be multiple TextInputs - use the first one
    fireEvent.changeText(component.UNSAFE_queryAllByType(TextInput)[0], '2');

    // Wait for the filter to take effect
    await waitFor(() => {
      expect(component.queryByText('Option 1')).toBeFalsy();
    });
    expect(component.queryByText('Option 2')).toBeTruthy();
  });

  it('should call onSelect when option is pressed', async () => {
    const onSelect = jest.fn();
    const component = render(
      <TestAutocomplete onSelect={onSelect} />,
    );
    fireEvent(component.UNSAFE_queryByType(TextInput), 'focus');
    await waitFor(() => expect(component.queryByText('Option 2')).toBeTruthy());

    // Press Option 2 (index 1)
    const option2 = component.getByText('Option 2');
    fireEvent.press(option2);
    expect(onSelect).toBeCalledWith(1);
  });

  it('should hide options when backdrop is pressed', async () => {
    const component = render(
      <TestAutocomplete />,
    );

    fireEvent(component.UNSAFE_queryByType(TextInput), 'focus');
    await waitFor(() => expect(component.queryByText('Option 1')).toBeTruthy());

    const backdrop = await waitFor(() => {
      const el = component.queryByTestId('@backdrop');
      expect(el).toBeTruthy();
      return el;
    });
    // Backdrop uses PanResponder - call the handler directly
    const responderRelease = backdrop.props.onResponderRelease;
    if (responderRelease) {
      responderRelease({ nativeEvent: {} });
    }

    await waitFor(() => {
      expect(component.queryByText('Option 1')).toBeFalsy();
      expect(component.queryByText('Option 2')).toBeFalsy();
    });
  });

  it('should call onFocus', async () => {
    const onFocus = jest.fn();
    const component = render(
      <TestAutocomplete onFocus={onFocus} />,
    );

    fireEvent(component.UNSAFE_queryByType(TextInput), 'focus');
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur', async () => {
    const onBlur = jest.fn();
    const component = render(
      <TestAutocomplete onBlur={onBlur} />,
    );

    fireEvent(component.UNSAFE_queryByType(TextInput), 'blur');
    expect(onBlur).toBeCalled();
  });

  it('should be able to call focus with ref', async () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();
    render(
      <TestAutocomplete ref={componentRef} />,
    );

    expect(componentRef.current.focus).toBeTruthy();
    componentRef.current.focus();
  });

  it('should be able to call blur with ref', async () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();
    render(
      <TestAutocomplete ref={componentRef} />,
    );

    expect(componentRef.current.blur).toBeTruthy();
    componentRef.current.blur();
  });

  it('should be able to call isFocused with ref', () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();
    render(
      <TestAutocomplete ref={componentRef} />,
    );

    expect(componentRef.current.isFocused).toBeTruthy();
    componentRef.current.isFocused();
  });

  it('should be able to call clear with ref', () => {
    const componentRef: React.RefObject<Autocomplete> = React.createRef();
    render(
      <TestAutocomplete ref={componentRef} />,
    );

    expect(componentRef.current.clear).toBeTruthy();
    componentRef.current.clear();
  });

});
