/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { Text } from 'react-native';
import {
  fireEvent,
  render,
  waitForElement,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  Toggle,
  ToggleComponent,
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

  it('should request checking', async () => {
    const onCheckedChange = jest.fn();

    const component = render(
      <TestToggle
        checked={false}
        onChange={onCheckedChange}
      />,
    );

    const responder = component.getByType(ToggleComponent).children[0];
    fireEvent(responder as ReactTestInstance, 'responderRelease');

    await waitForElement(() => expect(onCheckedChange).toBeCalledWith(true));
  });

  it('should request unchecking', async () => {
    const onCheckedChange = jest.fn();

    const component = render(
      <TestToggle
        checked={true}
        onChange={onCheckedChange}
      />,
    );

    const responder = component.getByType(ToggleComponent).children[0];
    fireEvent(responder as ReactTestInstance, 'responderRelease');

    await waitForElement(() => expect(onCheckedChange).toBeCalledWith(false));
  });

  it('should render text', () => {
    const component = render(
      <TestToggle text='I love Babel'/>,
    );

    const text = component.getByText('I love Babel');

    expect(text).toBeTruthy();
  });

  it('should render text as component', () => {
    const component = render(
      <TestToggle text={props => <Text {...props}>I love Babel</Text>}/>,
    );

    const text = component.getByText('I love Babel');

    expect(text).toBeTruthy();
  });

});
