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
  Tab,
  TabProps,
} from './tab.component';
import {
  TabBar,
  TabBarProps,
} from './tabBar.component';
import {
  TabView,
  TabViewProps,
} from './tabView.component';

describe('@tab: component checks', () => {

  const TestTab = (props?: TabProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Tab {...props} />
    </ApplicationProvider>
  );

  it('should render image passed to icon prop', () => {
    const Icon = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const component = render(
      <TestTab icon={Icon}/>,
    );

    const image = component.getByType(Image);

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
  });

  it('should render string passed to title prop', () => {
    const component = render(
      <TestTab title='I love Babel'/>,
    );

    const title = component.getByText('I love Babel');
    expect(title).toBeTruthy();
  });

  it('should render component passed to title prop', () => {
    const component = render(
      <TestTab title={props => <Text {...props}>I love Babel</Text>}/>,
    );

    const titleAsComponent = component.getByText('I love Babel');

    expect(titleAsComponent).toBeTruthy();
  });

});

describe('@tab-bar: component checks', () => {

  const TestTabBar = (props?: Partial<TabBarProps>) => {
    const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <TabBar
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}>
          <Tab title='Tab 0'/>
          <Tab title='Tab 1'/>
        </TabBar>
      </ApplicationProvider>
    );
  };

  it('should render 2 tabs passed to children', () => {
    const component = render(
      <TestTabBar/>,
    );

    const tabs = component.getAllByType(Tab);

    expect(tabs.length).toEqual(2);
  });

  it('should set tab selected by passing selectedIndex prop', () => {
    const component = render(
      <TestTabBar selectedIndex={1}/>,
    );

    const tabs = component.getAllByType(Tab);

    expect(tabs[1].props.selected).toEqual(true);
  });

  it('should set tab selected by pressing it', () => {
    const component = render(
      <TestTabBar selectedIndex={1}/>,
    );

    const touchables = component.getAllByType(TouchableOpacity);
    fireEvent.press(touchables[0]);

    const tabs = component.getAllByType(Tab);

    expect(tabs[0].props.selected).toEqual(true);
  });

});

describe('@tab-view: component checks', () => {

  const TestTabView = (props?: TabViewProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <TabView {...props}>
        <Tab>
          <Text>Tab 0</Text>
        </Tab>
        <Tab>
          <Text>Tab 1</Text>
        </Tab>
      </TabView>
    </ApplicationProvider>
  );

  it('should render 2 tabs passed to children', () => {
    const component = render(
      <TestTabView/>,
    );

    const tabs = component.getAllByType(Tab);
    expect(tabs.length).toEqual(2);
  });

  it('should render 2 content elements passed to tab children', () => {
    const component = render(
      <TestTabView/>,
    );

    expect(component.getByText('Tab 0')).toBeTruthy();
    expect(component.getByText('Tab 1')).toBeTruthy();
  });

  it('should not render content elements if disabled by shouldLoadComponent prop', () => {
    const component = render(
      <TestTabView shouldLoadComponent={index => index !== 1}/>,
    );

    expect(component.queryByText('Tab 0')).toBeTruthy();
    expect(component.queryByText('Tab 1')).toBeFalsy();
  });
});

