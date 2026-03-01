/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import { render } from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Avatar,
  AvatarProps,
} from './avatar.component';

describe('@avatar: component checks', () => {

  const TestAvatar = (props: Partial<AvatarProps>): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <Avatar
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
        {...props}
      />
    </ApplicationProvider>
  );

  it('should render image', () => {
    const component = render(
      <TestAvatar />,
    );

    const avatar = component.UNSAFE_queryByType(Image);

    expect(avatar).toBeTruthy();
    expect(avatar.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
  });

  it('should be round', () => {
    const component = render(
      <TestAvatar shape='round' />,
    );

    const avatar = component.UNSAFE_queryByType(Image);
    const { borderRadius, height } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toEqual(height / 2);
  });

  it('should be rounded', () => {
    const component = render(
      <TestAvatar shape='rounded' />,
    );

    const avatar = component.UNSAFE_queryByType(Image);
    const { borderRadius, height } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toBeLessThan(height);
  });

  it('should be square', () => {
    const component = render(
      <TestAvatar shape='square' />,
    );

    const avatar = component.UNSAFE_queryByType(Image);
    const { borderRadius } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toEqual(0);
  });

});
