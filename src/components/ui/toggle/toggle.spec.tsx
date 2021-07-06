/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { Text, View } from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitForElement,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { TouchableWeb } from '../../devsupport';
import { ApplicationProvider } from '../../theme';
import {
  Toggle,
  ToggleProps,
} from './toggle.component';

describe('@toggle: component checks', () => {

  const TestToggle = (props?: ToggleProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Toggle {...props} />
    </ApplicationProvider>
  );

  const touchables = {
    findRootTouchable: (api: RenderAPI) => api.queryByType(TouchableWeb).children[0] as ReactTestInstance,
  };

  it('should request checking', async () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestToggle
        checked={false}
        onChange={onCheckedChange}
      />,
    );

    fireEvent(touchables.findRootTouchable(component), 'responderRelease');
    await waitForElement(() => {
      expect(onCheckedChange).toBeCalledWith(true);
    });
  });

  it('should request unchecking', async () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestToggle
        checked={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent(touchables.findRootTouchable(component), 'responderRelease');
    await waitForElement(() => {
      expect(onCheckedChange).toBeCalledWith(false);
    });
  });

  it('should render text', () => {
    const component = render(
      <TestToggle>I love Babel</TestToggle>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text as function component', () => {
    const component = render(
      <TestToggle>
        {props => <Text {...props}>I love Babel</Text>}
      </TestToggle>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render pure JSX component', () => {
    const component = render(
      <TestToggle>
        <View>
          <Text>I love Babel</Text>
        </View>
      </TestToggle>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

});
