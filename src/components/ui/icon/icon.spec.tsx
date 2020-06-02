/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  View,
  ViewProps,
} from 'react-native';
import { render } from 'react-native-testing-library';
import { IconRegistry } from './iconRegistry.component';
import {
  Icon,
  IconProps,
} from './icon.component';
import {
  IconPack,
  IconProvider,
} from './service/type';

const DefaultIcon: IconProvider<IconProps> = {
  toReactElement: (props?: IconProps): React.ReactElement<IconProps> => (
    <View testID='default' {...props} />
  ),
};

const AdditionalIcon: IconProvider<IconProps> = {
  toReactElement: (props?: IconProps): React.ReactElement<IconProps> => (
    <View testID='additional' {...props} />
  ),
};

const testIconPack1: IconPack<ViewProps> = {
  name: 'test-icon-pack',
  icons: {
    home: DefaultIcon,
    gear: DefaultIcon,
  },
};

const testIconPack2: IconPack<ViewProps> = {
  name: 'additional-icon-pack',
  icons: {
    home: AdditionalIcon,
  },
};

describe('@icon: component checks', () => {

  beforeAll(() => {
    render(
      <IconRegistry
        icons={[testIconPack1, testIconPack2]}
        defaultIcons={testIconPack1.name}
      />,
    );

    /*
     * Prevent posting output to console
     */
    jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render icon from default pack', () => {
    const component = render(
      <Icon name='home'/>,
    );

    expect(component.queryByTestId('default')).toBeTruthy();
  });

  it('should render icon from additional pack', () => {
    const component = render(
      <Icon
        name='home'
        pack='additional-icon-pack'
      />,
    );

    expect(component.queryByTestId('additional')).toBeTruthy();
  });

  it('should pass props to an icon component', () => {
    const component = render(
      <Icon name='home' testID='custom-test-id'/>,
    );

    expect(component.queryByTestId('custom-test-id')).toBeTruthy();
  });

  it('should throw while rendering not registered icon', () => {
    expect(() => {
      render(
        <Icon name='not-registered-icon'/>,
      );
    }).toThrowError();

    expect(() => {
      render(
        <Icon
          name='not-registered-icon'
          pack='additional-icon-pack'
        />,
      );
    }).toThrowError();
  });

  it('should throw while rendering icon from not registered pack', () => {
    expect(() => {
      render(
        <Icon name='home' pack='not-registered-pack'/>,
      );
    }).toThrowError();
  });

  it('should render without an animation if animation is null', () => {
    const component = render(
      <Icon name='home' animation={null} />,
    );

    expect(() => component.UNSAFE_getByType(Animated.View)).toThrow();
  });
});
