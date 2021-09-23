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
import {
  Menu,
  MenuProps,
} from './menu.component';
import {
  MenuItem,
  MenuItemProps,
} from './menuItem.component';
import { IndexPath } from '../../devsupport';
import { MenuGroup } from './menuGroup.component';

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

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text passed to title prop as pure JSX component', () => {
    const component = render(
      <TestMenuItem title={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render function component passed to title prop', () => {
    const component = render(
      <TestMenuItem title={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });


  it('should render functional components passed to accessoryLeft or accessoryRight props', () => {
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
      <TestMenuItem
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

  it('should call onPress', () => {
    const onPress = jest.fn();
    const component = render(
      <TestMenuItem onPress={onPress}/>,
    );

    fireEvent.press(component.queryByType(TouchableOpacity));
    expect(onPress).toHaveBeenCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestMenuItem onPressIn={onPressIn}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestMenuItem onPressOut={onPressOut}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toBeCalled();
  });

});

describe('@menu: component checks', () => {

  const TestMenu = (props: MenuProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Menu {...props}/>
    </ApplicationProvider>
  );

  it('should render two menu items passed to children', () => {
    const component = render(
      <TestMenu>
        <MenuItem title='Option 1'/>
        <MenuItem title='Option 2'/>
      </TestMenu>,
    );

    expect(component.queryByText('Option 1')).toBeTruthy();
    expect(component.queryByText('Option 2')).toBeTruthy();
  });

  it('should call onSelect with non-grouped index', () => {
    const onSelect = jest.fn((index: IndexPath) => {
      expect(index.row).toEqual(1);
      expect(index.section).toBeFalsy();
    });

    const component = render(
      <TestMenu onSelect={onSelect}>
        <MenuItem title='Option 1'/>
        <MenuItem title='Option 2'/>
      </TestMenu>,
    );

    fireEvent.press(component.queryByText('Option 2'));
  });

  it('should call onSelect with grouped index', () => {
    const onSelect = jest.fn((index: IndexPath) => {
      expect(index.row).toEqual(0);
      expect(index.section).toEqual(1);
    });

    const component = render(
      <TestMenu onSelect={onSelect}>
        <MenuGroup title='Group 1'>
          <MenuItem title='Option 1.1'/>
          <MenuItem title='Option 1.2'/>
        </MenuGroup>
        <MenuGroup title='Group 2'>
          <MenuItem title='Option 2.1'/>
          <MenuItem title='Option 2.2'/>
        </MenuGroup>
      </TestMenu>,
    );

    fireEvent.press(component.queryByText('Option 2.1'));
  });

  it('should fire onPress on group with row = 0, section = undefined', () => {
    const onSelect = jest.fn((index: IndexPath) => {
      expect(index.row).toEqual(0);
      expect(index.section).toBeFalsy();
    });

    const component = render(
      <TestMenu onSelect={onSelect}>
        <MenuGroup title='Group 1'>
          <MenuItem title='Option 1.1'/>
          <MenuItem title='Option 1.2'/>
        </MenuGroup>
        <MenuItem title='Option 1'/>
      </TestMenu>
    );

    fireEvent.press(component.queryByText('Group 1'));
  });

  it('should fire onPress on group with row = 1, section = undefined', () => {
    const onSelect = jest.fn((index: IndexPath) => {
      expect(index.row).toEqual(1);
      expect(index.section).toBeFalsy();
    });

    const component = render(
      <TestMenu onSelect={onSelect}>
        <MenuItem title='Option 1'/>
        <MenuGroup title='Group 2'>
          <MenuItem title='Option 2.1'/>
          <MenuItem title='Option 2.2'/>
        </MenuGroup>
        <MenuItem title='Option 3'/>
      </TestMenu>
    );

    fireEvent.press(component.queryByText('Group 2'));
  });

  it('should fire onPress event for group & item separately', () => {
    const onGroupPress = jest.fn();
    const onItemPress = jest.fn();
    const onSelect = jest.fn();

    const component = render(
      <TestMenu onSelect={onSelect}>
        <MenuGroup onPress={onGroupPress} title='Group 1'>
          <MenuItem onPress={onItemPress} title='Option 1.1'/>
          <MenuItem title='Option 1.2'/>
        </MenuGroup>
        <MenuGroup title='Group 2'>
          <MenuItem title='Option 2.1'/>
          <MenuItem title='Option 2.2'/>
        </MenuGroup>
      </TestMenu>,
    );

    fireEvent.press(component.queryByText('Group 1'));
    expect(onGroupPress).toBeCalledTimes(1);

    fireEvent.press(component.queryByText('Option 1.1'));
    expect(onItemPress).toBeCalledTimes(1);

    expect(onSelect).toBeCalledTimes(2);
  });
});


