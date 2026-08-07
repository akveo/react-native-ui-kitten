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
  TouchableOpacity,
} from 'react-native';
import {
  fireEvent,
  render,
} from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  List,
  ListProps,
  ListRef,
} from './list.component';
import {
  ListItem,
  ListItemProps,
} from './listItem.component';

describe('@list-item: component checks', () => {

  const TestListItem = (props?: ListItemProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <ListItem {...props} />
    </ApplicationProvider>
  );

  it('should render text passed to title prop', () => {
    const component = render(
      <TestListItem title='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render functional component passed to title prop', () => {
    const component = render(
      <TestListItem title={props => (
        <Text {...props}>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render pure JXS component passed to title prop', () => {
    const component = render(
      <TestListItem title={(
        <Text>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text passed to description prop', () => {
    const component = render(
      <TestListItem description='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render functional component passed to description prop', () => {
    const component = render(
      <TestListItem description={props => (
        <Text {...props}>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render pure JSX component passed to description prop', () => {
    const component = render(
      <TestListItem description={(
        <Text>
I love Babel
        </Text>
      )}
      />,
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
      <TestListItem
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
      <TestListItem
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

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestListItem onPressIn={onPressIn} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toHaveBeenCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestListItem onPressOut={onPressOut} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toHaveBeenCalled();
  });
});

describe('@list: component checks', () => {

  const TestList = React.forwardRef((props: Partial<ListProps>, ref: React.Ref<ListRef>) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <List
        ref={ref}
        data={new Array(2)}
        renderItem={() => <ListItem />}
        {...props}
      />
    </ApplicationProvider>
  ),
  );

  TestList.displayName = 'TestList';

  it('should render 2 list items', () => {
    const component = render(
      <TestList />,
    );

    expect(component.UNSAFE_queryAllByType(ListItem).length).toEqual(2);
  });

  it('should call renderItem once per visible item', () => {
    const renderItem = jest.fn();
    render(
      <TestList
        data={new Array(11)}
        renderItem={renderItem}
      />,
    );

    expect(renderItem).toHaveBeenCalledTimes(10);
  });

  it('should be able to call scrollToEnd with ref', () => {
    const componentRef = React.createRef<ListRef>();
    render(
      <TestList
        ref={componentRef}
        data={new Array(11)}
      />,
    );

    expect(componentRef.current.scrollToEnd).toBeTruthy();
    componentRef.current.scrollToEnd({});
  });

  it('should be able to call scrollToIndex with ref', () => {
    const componentRef = React.createRef<ListRef>();
    render(
      <TestList ref={componentRef} />,
    );

    expect(componentRef.current.scrollToIndex).toBeTruthy();
    componentRef.current.scrollToIndex({ index: 0 });
  });

  it('should be able to call scrollToIndex with ref', () => {
    const componentRef = React.createRef<ListRef>();
    render(
      <TestList ref={componentRef} />,
    );

    expect(componentRef.current.scrollToOffset).toBeTruthy();
    componentRef.current.scrollToOffset({ offset: 0 });
  });

});
