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
  Text,
} from 'react-native';
import {
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';
import {
  dark,
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Avatar,
  AvatarProps,
  initialsOf,
} from './avatar.component';

const themeValue = (name: string): string => {
  let value: string = light[name];
  while (typeof value === 'string' && value.startsWith('$')) {
    value = light[value.slice(1)];
  }
  return value;
};

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

  describe('initials', () => {
    it('should derive initials from the first two words', () => {
      expect(initialsOf('Jane Doe')).toEqual('JD');
      expect(initialsOf('  ada   lovelace  byron ')).toEqual('AL');
      expect(initialsOf('Plato')).toEqual('P');
    });

    it('should keep emoji and characters outside the BMP whole', () => {
      expect(initialsOf('😀 bob')).toEqual('😀B');
      expect(initialsOf('𝒜da Lovelace')).toEqual('𝒜L');
    });

    it('should treat a source without a uri as missing', () => {
      for (const source of [{ uri: null }, { uri: '' }, [{ uri: '' }, { uri: undefined }, { uri: '' }]]) {
        const component = render(
          <TestAvatar
            source={source as never}
            name='Jane Doe'
          />,
        );
        expect(component.queryByText('JD')).toBeTruthy();
        expect(component.UNSAFE_queryByType(Image)).toBeNull();
      }
    });

    it('should show nothing but the image for a whitespace-only name', () => {
      const component = render(
        <TestAvatar
          source={undefined}
          name='   '
        />,
      );

      expect(component.UNSAFE_queryByType(Text)).toBeNull();
      expect(component.UNSAFE_getByType(Image).props['aria-label']).toBeUndefined();
    });

    it('should prefer the consumer accessible name on the initials frame', () => {
      const component = render(
        <TestAvatar
          source={undefined}
          name='Jane Doe'
          aria-label='Profile photo of Jane'
        />,
      );

      expect(component.getByLabelText('Profile photo of Jane')).toBeTruthy();
      expect(component.queryByLabelText('Jane Doe')).toBeNull();
    });

    it('should render initials instead of an image without a source', () => {
      const component = render(
        <TestAvatar
          source={undefined}
          name='Jane Doe'
        />,
      );

      expect(component.UNSAFE_queryByType(Image)).toBeFalsy();
      expect(component.queryByText('JD')).toBeTruthy();
      expect(component.queryByLabelText('Jane Doe')).toBeTruthy();
    });

    it('should keep rendering the image when a name is set and the source loads', () => {
      const component = render(
        <TestAvatar name='Jane Doe' />,
      );

      expect(component.UNSAFE_queryByType(Image)).toBeTruthy();
      expect(component.queryByText('JD')).toBeFalsy();
    });

    it('should fall back to initials when the image fails and forward onError', async () => {
      const onError = jest.fn();
      const component = render(
        <TestAvatar
          name='Jane Doe'
          onError={onError}
        />,
      );

      await act(async () => {
        fireEvent(component.UNSAFE_getByType(Image), 'error', { nativeEvent: { error: 'boom' } });
      });

      expect(onError).toHaveBeenCalledTimes(1);
      expect(component.UNSAFE_queryByType(Image)).toBeFalsy();
      expect(component.queryByText('JD')).toBeTruthy();
    });

    it('should keep the fallback when the same uri is passed as a new object and retry on a new uri', async () => {
      const Wrapper = ({ uri }: { uri: string }): React.ReactElement => (
        <TestAvatar
          name='Jane Doe'
          source={{ uri }}
        />
      );
      const component = render(<Wrapper uri='https://example.com/a.png' />);

      await act(async () => {
        fireEvent(component.UNSAFE_getByType(Image), 'error', { nativeEvent: { error: 'boom' } });
      });
      component.rerender(<Wrapper uri='https://example.com/a.png' />);

      expect(component.queryByText('JD')).toBeTruthy();

      component.rerender(<Wrapper uri='https://example.com/b.png' />);

      expect(component.UNSAFE_queryByType(Image)).toBeTruthy();
      expect(component.queryByText('JD')).toBeFalsy();
    });

    it('should render nothing but the image without a name', () => {
      const component = render(
        <TestAvatar source={undefined} />,
      );

      expect(component.UNSAFE_queryByType(Image)).toBeTruthy();
      expect(component.UNSAFE_queryAllByType(Text).length).toEqual(0);
    });

    it('should size and shape the initials frame like the image', () => {
      const component = render(
        <TestAvatar
          source={undefined}
          name='Jane Doe'
          size='giant'
          shape='round'
        />,
      );

      const frame = component.getByLabelText('Jane Doe');
      const { width, height, borderRadius } = StyleSheet.flatten(frame.props.style);

      expect(width).toEqual(height);
      expect(borderRadius).toEqual(height / 2);
      expect(StyleSheet.flatten(component.getByText('JD').props.style).fontSize)
        .toEqual(mapping.components.Avatar.appearances.default.variantGroups.size.giant.textFontSize);
    });

    it('should colour the initials frame by status', () => {
      const component = render(
        <TestAvatar
          source={undefined}
          name='Jane Doe'
          status='primary'
        />,
      );

      const frame = component.getByLabelText('Jane Doe');

      expect(StyleSheet.flatten(frame.props.style).backgroundColor).toEqual(themeValue('color-primary-default'));
      expect(StyleSheet.flatten(component.getByText('JD').props.style).color).toEqual(themeValue('text-control-color'));
    });

    it('should keep basic initials readable on the light frame in the dark theme', () => {
      const darkValue = (name: string): string => {
        let value: string = dark[name];
        while (typeof value === 'string' && value.startsWith('$')) {
          value = dark[value.slice(1)];
        }
        return value;
      };

      const component = render(
        <ApplicationProvider
          mapping={mapping}
          theme={dark}
        >
          <Avatar
            source={undefined}
            name='Jane Doe'
          />
        </ApplicationProvider>,
      );

      const frame = component.getByLabelText('Jane Doe');
      const textColor = StyleSheet.flatten(component.getByText('JD').props.style).color;

      expect(StyleSheet.flatten(frame.props.style).backgroundColor).toEqual(darkValue('color-basic-default'));
      expect(textColor).toEqual(darkValue('color-basic-800'));
      expect(textColor).not.toEqual(darkValue('text-basic-color'));
    });
  });

});
