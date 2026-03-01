/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
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

});
