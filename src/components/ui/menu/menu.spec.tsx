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
  TouchableOpacity,
} from 'react-native';
import {
  light,
  mapping,
} from '@eva-design/eva';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import { ApplicationProvider } from '../../theme';
import { Menu } from './menu.component';
import {
  MenuItem,
  MenuItemProps,
} from './menuItem.component';

jest.useFakeTimers();

describe('@menu-item: component checks', () => {

  const TestMenuItem = (props?: MenuItemProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <MenuItem {...props}/>
    </ApplicationProvider>
  );

  it('should render text passed to title prop', () => {
    const component = render(
      <TestMenuItem title='I love Babel'/>,
    );

    const title = component.getByText('I love Babel');

    expect(title).toBeTruthy();
  });

  it('should render component passed to title prop', () => {
    const component = render(
      <TestMenuItem title={props => <Text {...props}>Title as Component</Text>}/>,
    );

    const titleAsComponent = component.getByText('Title as Component');

    expect(titleAsComponent).toBeTruthy();
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
      <TestMenuItem
        accessoryLeft={AccessoryLeft}
        accessoryRight={AccessoryRight}
      />,
    );

    const [accessoryLeft, accessoryRight] = component.getAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should render 2 menu items passed to children', () => {
    const component = render(
      <TestMenuItem title='Test Group'>
        <MenuItem title='Nested Item 1'/>
        <MenuItem title='Nested Item 2'/>
      </TestMenuItem>,
    );

    const nestedItem1 = component.getByText('Nested Item 1');
    const nestedItem2 = component.getByText('Nested Item 2');

    expect(nestedItem1).toBeTruthy();
    expect(nestedItem2).toBeTruthy();
  });

  it('should call onPress', () => {
    const onPress = jest.fn();

    const component = render(
      <TestMenuItem onPress={onPress}/>,
    );

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onPress).toHaveBeenCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();

    const component = render(
      <TestMenuItem onPressIn={onPressIn}/>,
    );

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();

    const component = render(
      <TestMenuItem onPressOut={onPressOut}/>,
    );

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    expect(onPressOut).toBeCalled();
  });

});

describe('@menu: component checks', () => {

  const TestMenu = () => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Menu>
        <MenuItem/>
        <MenuItem/>
      </Menu>
    </ApplicationProvider>
  );

  it('should render two menu items passed to children', () => {
    const component = render(
      <TestMenu/>,
    );

    const items = component.getAllByType(MenuItem);
    expect(items.length).toEqual(2);
  });
});


