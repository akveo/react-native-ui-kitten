/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import { render } from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  Avatar,
  AvatarProps,
} from './avatar.component';

describe('@avatar: component checks', () => {

  const TestAvatar = (props: Partial<AvatarProps>) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Avatar
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
        {...props}
      />
    </ApplicationProvider>
  );

  it('should render image', () => {
    const component = render(
      <TestAvatar/>,
    );

    const avatar = component.queryByType(Image);

    expect(avatar).toBeTruthy();
    expect(avatar.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
  });

  it('should be round', () => {
    const component = render(
      <TestAvatar shape='round'/>,
    );

    const avatar = component.queryByType(Image);
    const { borderRadius, height } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toEqual(height / 2);
  });

  it('should be rounded', () => {
    const component = render(
      <TestAvatar shape='rounded'/>,
    );

    const avatar = component.queryByType(Image);
    const { borderRadius, height } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toBeLessThan(height);
  });

  it('should be square', () => {
    const component = render(
      <TestAvatar shape='square'/>,
    );

    const avatar = component.queryByType(Image);
    const { borderRadius } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toEqual(0);
  });

});
