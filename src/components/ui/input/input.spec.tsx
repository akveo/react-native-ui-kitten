/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  ImageProps,
  Text,
  TextInput,
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
  Input,
  InputProps,
} from './input.component';

describe('@input: component checks', () => {

  const TestInput = React.forwardRef((props: InputProps, ref: React.Ref<Input>) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Input ref={ref} {...props}/>
    </ApplicationProvider>
  ));

  it('should be able to call focus via ref', () => {
    const componentRef: React.RefObject<Input> = React.createRef();
    render(
      <TestInput ref={componentRef}/>,
    );

    expect(componentRef.current.focus).toBeTruthy();
  });

  it('should be able to call blur via ref', () => {
    const componentRef: React.RefObject<Input> = React.createRef();
    render(
      <TestInput ref={componentRef}/>,
    );

    expect(componentRef.current.blur).toBeTruthy();
  });

  it('should be able to call isFocused via ref', () => {
    const componentRef: React.RefObject<Input> = React.createRef();
    render(
      <TestInput ref={componentRef}/>,
    );

    expect(componentRef.current.isFocused).toBeTruthy();
  });

  it('should be able to call clear via ref', () => {
    const componentRef: React.RefObject<Input> = React.createRef();
    render(
      <TestInput ref={componentRef}/>,
    );

    expect(componentRef.current.clear).toBeTruthy();
  });

  it('should set TextInput editable to false by passing disabled prop', () => {
    const component = render(
      <TestInput disabled={true}/>,
    );

    const textInput = component.queryByType(TextInput);
    expect(textInput.props.editable).toEqual(false);
  });

  it('should render placeholder', () => {
    const component = render(
      <TestInput placeholder='I love Babel'/>,
    );

    expect(component.queryByPlaceholder('I love Babel')).toBeTruthy();
  });

  it('should render text passed to label prop', () => {
    const component = render(
      <TestInput label='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render function component passed to label prop', () => {
    const component = render(
      <TestInput label={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render pure JSX component passed to label prop', () => {
    const component = render(
      <TestInput label={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text passed to caption prop', () => {
    const renderCaption = () => (
      <Text>I love Babel</Text>
    );

    const component = render(
      <TestInput caption={renderCaption}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render pure JSX component passed to caption prop', () => {
    const renderCaption = (
      <Text>I love Babel</Text>
    );

    const component = render(
      <TestInput caption={renderCaption}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text passed to caption prop', () => {
    const component = render(
      <TestInput caption='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to caption prop', () => {
    const Caption = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const component = render(
      <TestInput caption={Caption}/>,
    );

    const caption = component.queryByType(Image);

    expect(caption).toBeTruthy();
    expect(caption.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
  });

  it('should render function components passed to accessoryLeft or accessoryRight props', () => {
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
      <TestInput
        accessoryLeft={AccessoryLeft}
        accessoryRight={AccessoryRight}
      />,
    );

    const [accessoryLeft, accessoryRight] = component.queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should render pure JSX components passed to accessoryLeft or accessoryRight props', () => {
    const AccessoryLeft = (
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const AccessoryRight = (
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}
      />
    );

    const component = render(
      <TestInput
        accessoryLeft={AccessoryLeft}
        accessoryRight={AccessoryRight}
      />,
    );

    const [accessoryLeft, accessoryRight] = component.queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should request text change', () => {
    const onChangeText = jest.fn();
    const component = render(
      <TestInput onChangeText={onChangeText}/>,
    );

    fireEvent.changeText(component.queryByType(TextInput), 'I love Babel');
    expect(onChangeText).toBeCalledWith('I love Babel');
  });

  it('should call onFocus', () => {
    const onFocus = jest.fn();
    const component = render(
      <TestInput onFocus={onFocus}/>,
    );

    fireEvent(component.queryByType(TextInput), 'focus');
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur', () => {
    const onBlur = jest.fn();
    const component = render(
      <TestInput onBlur={onBlur}/>,
    );

    fireEvent(component.queryByType(TextInput), 'blur');
    expect(onBlur).toBeCalled();
  });
});
