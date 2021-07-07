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
  BottomNavigation,
  BottomNavigationProps,
} from './bottomNavigation.component';
import {
  BottomNavigationTab,
  BottomNavigationTabProps,
} from './bottomNavigationTab.component';

describe('@bottom-navigation-tab: component checks', () => {

  const TestBottomNavigationTab = (props?: BottomNavigationTabProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <BottomNavigationTab {...props}/>
    </ApplicationProvider>
  );

  it('should render component passed to icon prop', () => {
    const Icon = (props?: Partial<ImageProps>) => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const component = render(
      <TestBottomNavigationTab icon={Icon}/>,
    );

    const image = component.queryByType(Image);

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
  });

  it('should render text passed to title prop', () => {
    const component = render(
      <TestBottomNavigationTab title='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to title prop', () => {
    const component = render(
      <TestBottomNavigationTab title={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render title from prop passed as pure JSX element', () => {
    const component = render(
      <TestBottomNavigationTab title={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  })

  it('should render icon from prop passed as pure JSX element', () => {
    const component = render(
      <TestBottomNavigationTab icon={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  })

  it('should call onMouseEnter', () => {
    const onMouseEnter = jest.fn();

    const component = render(
      <TestBottomNavigationTab onMouseEnter={onMouseEnter}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'mouseEnter');
    expect(onMouseEnter).toBeCalled();
  });

  it('should call onMouseLeave', () => {
    const onMouseLeave = jest.fn();

    const component = render(
      <TestBottomNavigationTab onMouseLeave={onMouseLeave}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'mouseLeave');
    expect(onMouseLeave).toBeCalled();
  });
});

describe('@bottom-navigation: component checks', () => {

  const TestBottomNavigation = (props?: Partial<BottomNavigationProps>) => {
    const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

    const onSelect = (index: number): void => {
      setSelectedIndex(index);
      props.onSelect && props.onSelect(index);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <BottomNavigation
          selectedIndex={selectedIndex}
          onSelect={onSelect}>
          <BottomNavigationTab title='Tab 0'/>
          <BottomNavigationTab title='Tab 1'/>
        </BottomNavigation>
      </ApplicationProvider>
    );
  };

  it('should render 2 tabs passed to children', () => {
    const component = render(
      <TestBottomNavigation/>,
    );

    expect(component.queryAllByType(BottomNavigationTab).length).toEqual(2);
  });

  it('should set tab selected by passing selectedIndex prop', () => {
    const component = render(
      <TestBottomNavigation selectedIndex={1}/>,
    );

    expect(component.queryAllByType(BottomNavigationTab)[1].props.selected).toEqual(true);
  });

  it('should set tab selected by pressing it', () => {
    const component = render(
      <TestBottomNavigation selectedIndex={1}/>,
    );

    fireEvent.press(component.queryAllByType(TouchableOpacity)[0]);
    expect(component.queryAllByType(BottomNavigationTab)[0].props.selected).toEqual(true);
  });

  it('should request selecting', () => {
    const onSelect = jest.fn();

    const component = render(
      <TestBottomNavigation onSelect={onSelect}/>,
    );

    fireEvent.press(component.queryAllByType(TouchableOpacity)[1]);
    expect(onSelect).toHaveBeenCalledWith(1);
  });

});
