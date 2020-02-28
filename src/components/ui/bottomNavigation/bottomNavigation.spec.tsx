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
    const Icon = (props?: ImageProps) => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const component = render(
      <TestBottomNavigationTab icon={Icon}/>,
    );

    const image = component.getByType(Image);

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
  });

  it('should render text passed to title prop', () => {
    const component = render(
      <TestBottomNavigationTab title='I love Babel'/>,
    );

    const title = component.getByText('I love Babel');

    expect(title).toBeTruthy();
  });

  it('should render component passed to title prop', () => {
    const component = render(
      <TestBottomNavigationTab title={props => <Text {...props}>I love Babel</Text>}/>,
    );

    const titleAsComponent = component.getByText('I love Babel');

    expect(titleAsComponent).toBeTruthy();
  });
});

describe('@bottom-navigation: component checks', () => {

  const TestBottomNavigation = (props?: Partial<BottomNavigationProps>) => {
    const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <BottomNavigation
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}>
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

    const tabs = component.getAllByType(BottomNavigationTab);

    expect(tabs.length).toEqual(2);
  });

  it('should set tab selected by passing selectedIndex prop', () => {
    const component = render(
      <TestBottomNavigation selectedIndex={1}/>,
    );

    const tabs = component.getAllByType(BottomNavigationTab);

    expect(tabs[1].props.selected).toEqual(true);
  });

  it('should set tab selected by pressing it', () => {
    const component = render(
      <TestBottomNavigation selectedIndex={1}/>,
    );

    const touchables = component.getAllByType(TouchableOpacity);
    fireEvent.press(touchables[0]);

    const tabs = component.getAllByType(BottomNavigationTab);

    expect(tabs[0].props.selected).toEqual(true);
  });

});
