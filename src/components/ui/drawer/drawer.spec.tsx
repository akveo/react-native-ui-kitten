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
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  Drawer,
  DrawerProps,
} from './drawer.component';
import {
  DrawerItem,
  DrawerItemProps,
} from './drawerItem.component';

describe('@drawer-item: component checks', () => {

  const TestDrawerItem = (props?: DrawerItemProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <DrawerItem {...props}/>
    </ApplicationProvider>
  );

  it('should render text passed to title prop', () => {
    const component = render(
      <TestDrawerItem title='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render function component passed to title prop', () => {
    const component = render(
      <TestDrawerItem title={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render pure JSX component passed to title prop', () => {
    const component = render(
      <TestDrawerItem title={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
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
      <TestDrawerItem
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
      <TestDrawerItem
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
      <TestDrawerItem onPress={onPress}/>,
    );

    fireEvent.press(component.queryByType(TouchableOpacity));

    expect(onPress).toHaveBeenCalled();
  });
});

describe('@drawer: component checks', () => {

  const TestDrawer = (props?: DrawerProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Drawer {...props}>
        <DrawerItem/>
        <DrawerItem/>
      </Drawer>
    </ApplicationProvider>
  );

  it('should render 2 drawer items passed to children', () => {
    const component = render(
      <TestDrawer/>,
    );

    const items = component.queryAllByType(DrawerItem);
    expect(items.length).toEqual(2);
  });

  it('should render function component passed to header prop', () => {
    const component = render(
      <TestDrawer header={() => <Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render pure JSX component passed to header prop', () => {
    const component = render(
      <TestDrawer header={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render function component passed to footer prop', () => {
    const component = render(
      <TestDrawer footer={() => <Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render pure JSX component passed to footer prop', () => {
    const component = render(
      <TestDrawer footer={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

});
