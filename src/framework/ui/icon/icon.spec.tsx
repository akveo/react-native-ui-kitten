import React from 'react';
import { View } from 'react-native';
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
  toReactElement(props?: IconProps): React.ReactElement<IconProps> {
    return (
      <View testID='default' {...props} />
    );
  },
};

const AdditionalIcon: IconProvider<IconProps> = {
  toReactElement(props?: IconProps): React.ReactElement<IconProps> {
    return (
      <View testID='additional' {...props} />
    );
  },
};

const testIconPack1: IconPack<any> = {
  name: 'test-icon-pack',
  icons: {
    home: DefaultIcon,
    gear: DefaultIcon,
  },
};

const testIconPack2: IconPack<any> = {
  name: 'additional-icon-pack',
  icons: {
    home: AdditionalIcon,
  },
};

describe('@icon: component checks', () => {

  beforeEach(() => {
    render(
      <IconRegistry
        icons={[testIconPack1, testIconPack2]}
        defaultIcons={testIconPack1.name}
      />,
    );
  });

  it('* should render icon from default pack', () => {
    const component = render(
      <Icon name='home'/>,
    );

    expect(component.getByTestId('default')).toBeTruthy();
  });

  it('* should render icon from additional pack', () => {
    const component = render(
      <Icon
        name='home'
        pack='additional-icon-pack'
      />,
    );

    expect(component.getByTestId('additional')).toBeTruthy();
  });

  it('* should pass props to an icon component', () => {
    const component = render(
      <Icon name='home' testID='custom-test-id'/>,
    );

    expect(component.getByTestId('custom-test-id')).toBeTruthy();
  });

  it('* should throw while rendering not registered icon', () => {
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

  it('* should throw while rendering icon from not registered pack', () => {
    expect(() => {
      render(
        <Icon name='home' pack='not-registered-pack'/>,
      );
    }).toThrowError();
  });

});
