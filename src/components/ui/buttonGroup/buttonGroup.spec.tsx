/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  ButtonGroup,
  ButtonGroupProps,
} from './buttonGroup.component';
import { Button } from '../button/button.component';
import { TouchableWeb } from '../../devsupport';

describe('@button-group: component checks', () => {

  const TestButtonGroup = (props?: Partial<ButtonGroupProps>): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <ButtonGroup {...props}>
        <Button />
        <Button />
      </ButtonGroup>
    </ApplicationProvider>
  );

  it('should render 2 buttons', () => {
    const component = render(
      <TestButtonGroup />,
    );

    expect(component.UNSAFE_queryAllByType(Button).length).toEqual(2);
  });

  it('should render outline buttons', () => {
    const component = render(
      <TestButtonGroup appearance='outline' />,
    );

    const buttons = component.UNSAFE_getAllByType(Button);
    const buttonAppearance: string = buttons.reduce((current: string, child: ReactTestInstance): string => {
      return child.props.appearance;
    }, 'outline');

    expect(buttonAppearance).toEqual('outline');
  });

  it('should render ghost buttons', () => {
    const component = render(
      <TestButtonGroup appearance='ghost' />,
    );

    const buttons = component.UNSAFE_getAllByType(Button);
    const buttonAppearance: string = buttons.reduce((current: string, child: ReactTestInstance): string => {
      return child.props.appearance;
    }, 'ghost');

    expect(buttonAppearance).toEqual('ghost');
  });

  it('should render giant buttons', () => {
    const component = render(
      <TestButtonGroup size='giant' />,
    );

    const buttons = component.UNSAFE_getAllByType(Button);
    const buttonSize: string = buttons.reduce((current: string, child: ReactTestInstance): string => {
      return child.props.size;
    }, 'giant');

    expect(buttonSize).toEqual('giant');
  });

  it('should render success buttons', () => {
    const component = render(
      <TestButtonGroup status='success' />,
    );

    const buttons = component.UNSAFE_getAllByType(Button);
    const buttonStatus: string = buttons.reduce((current: string, child: ReactTestInstance): string => {
      return child.props.status;
    }, 'success');

    expect(buttonStatus).toEqual('success');
  });

  it('should let child props win over the group props', () => {
    const component = render(
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <ButtonGroup
          appearance='outline'
          status='primary'
          size='small'
        >
          <Button />
          <Button
            appearance='filled'
            status='danger'
            size='giant'
          />
        </ButtonGroup>
      </ApplicationProvider>,
    );

    const [first, second] = component.UNSAFE_getAllByType(Button);

    expect(first.props.appearance).toEqual('outline');
    expect(first.props.status).toEqual('primary');
    expect(first.props.size).toEqual('small');
    expect(second.props.appearance).toEqual('filled');
    expect(second.props.status).toEqual('danger');
    expect(second.props.size).toEqual('giant');
  });

  it('should fill the selected button and keep the group appearance on the others', () => {
    const component = render(
      <TestButtonGroup
        appearance='outline'
        selectedIndex={1}
      />,
    );

    const [first, second] = component.UNSAFE_getAllByType(Button);

    expect(first.props.appearance).toEqual('outline');
    expect(second.props.appearance).toEqual('filled');
  });

  it('should not fill any button without selectedIndex', () => {
    const component = render(
      <TestButtonGroup appearance='outline' />,
    );

    const appearances = component.UNSAFE_getAllByType(Button).map(button => button.props.appearance);

    expect(appearances).toEqual(['outline', 'outline']);
  });

  it('should report the selected state of every button to assistive technologies', () => {
    const component = render(
      <TestButtonGroup
        appearance='outline'
        selectedIndex={1}
      />,
    );

    const [first, second] = component.UNSAFE_getAllByType(TouchableWeb);

    expect(first.props['aria-selected']).toEqual(false);
    expect(second.props['aria-selected']).toEqual(true);
  });

  it('should leave the selected state alone without selectedIndex or when a child sets it', () => {
    const plain = render(<TestButtonGroup appearance='outline' />);
    expect(plain.UNSAFE_getAllByType(TouchableWeb).map((button) => button.props['aria-selected']))
      .toEqual([undefined, undefined]);

    const own = render(
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <ButtonGroup selectedIndex={0}>
          <Button aria-selected={false} />
          <Button />
        </ButtonGroup>
      </ApplicationProvider>,
    );
    expect(own.UNSAFE_getAllByType(TouchableWeb).map((button) => button.props['aria-selected']))
      .toEqual([false, false]);
  });

  it('should call onSelect with the pressed index after the button onPress', () => {
    const calls: string[] = [];
    const component = render(
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <ButtonGroup onSelect={index => calls.push(`select:${index}`)}>
          <Button testID='first' />
          <Button
            testID='second'
            onPress={() => calls.push('press')}
          />
        </ButtonGroup>
      </ApplicationProvider>,
    );

    fireEvent.press(component.getByTestId('second'));
    fireEvent.press(component.getByTestId('first'));

    expect(calls).toEqual(['press', 'select:1', 'select:0']);
  });

  it('should keep the button onPress when onSelect is not set', () => {
    const onPress = jest.fn();
    const component = render(
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <ButtonGroup>
          <Button
            testID='first'
            onPress={onPress}
          />
        </ButtonGroup>
      </ApplicationProvider>,
    );

    fireEvent.press(component.getByTestId('first'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

});
