import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  shallow,
  waitForElement,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  OverflowMenuItemType,
  OverflowMenuItemProps,
  OverflowMenuItem,
} from './overflowMenuItem.component';
import {
  OverflowMenu,
  OverflowMenuProps,
} from './overflowMenu.component';
import {
  mapping,
  theme,
} from '../support/tests';


const MockMenu = (props?: OverflowMenuProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <OverflowMenu {...props} />
    </ApplicationProvider>
  );
};

const MockMenuItem = (props?: OverflowMenuItemProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <OverflowMenuItem {...props} />
    </ApplicationProvider>
  );
};

const icon = (style: StyleType): React.ReactElement<ImageProps> => {
  return (
    <Image source={iconSource} style={style}/>
  );
};

const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

const menuItems: OverflowMenuItemType[] = [
  {
    text: 'Menu Item 1',
    textStyle: {
      fontSize: 24,
      color: 'blue',
    },
    icon: icon,
  },
  {
    text: 'Menu Item 2',
    icon: icon,
    disabled: true,
  },
  {
    text: 'Menu Item 3',
  },
  {
    text: 'Menu Item 4',
    icon: icon,
  },
];

describe('@overflow-menu-item: component checks', () => {

  it('* menu item with "set-1" props', () => {
    const component: RenderAPI = render(
      <MockMenuItem
        text='Test Menu Item'
        icon={icon}
        disabled={true}
        onPress={() => 1}
      />,
    );

    const { output } = shallow(component.getByType(OverflowMenuItem));

    expect(output).toMatchSnapshot();
  });

  it('* menu item with "set-2" props', () => {
    const component: RenderAPI = render(
      <MockMenuItem
        text='Test Menu Item'
        disabled={false}
        onPress={() => 2}
      />,
    );

    const { output } = shallow(component.getByType(OverflowMenuItem));

    expect(output).toMatchSnapshot();
  });

  it('* menu item onPress prop checks', () => {
    const onPress = jest.fn();

    const menuItemTestId = 'menu-item-1';

    const component: RenderAPI = render(
      <MockMenuItem
        testID={menuItemTestId}
        text='Test Menu Item'
        onPress={onPress}
      />,
    );

    fireEvent.press(component.getByTestId(menuItemTestId));

    expect(onPress).toHaveBeenCalled();
  });

  it('* menu item onPress method checks', () => {
    const onPress = jest.fn();

    const component: RenderAPI = render(
      <MockMenuItem
        text='Test Menu Item'
        onPress={onPress}
      />,
    );

    fireEvent.press(component.getByType(TouchableOpacity));
    expect(onPress).toHaveBeenCalled();
  });

  it('* menu item active checks', async () => {
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const onLongPress = jest.fn();

    const component: RenderAPI = render(
      <MockMenuItem
        text='Test Menu Item'
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
      />,
    );

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');
    const active: ReactTestInstance = await waitForElement(() => {
      return component.getByType(OverflowMenuItem);
    });

    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');
    const inactive: ReactTestInstance = await waitForElement(() => {
      return component.getByType(OverflowMenuItem);
    });

    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot();
    expect(onPressIn).toHaveBeenCalled();
    expect(onPressOut).toHaveBeenCalled();
  });

});

describe('@overflow-menu: component checks', () => {

  it('* component renders properly', () => {
    const onRequestClose = () => {
    };

    const component: RenderAPI = render(
      <MockMenu
        visible={true}
        items={menuItems}
        onRequestClose={onRequestClose}>
        <View/>
      </MockMenu>,
    );

    const { output } = shallow(component.getByType(OverflowMenu));

    expect(output).toMatchSnapshot();
  });

  it('* single menu-item', () => {
    const onRequestClose = () => {
    };

    const component: RenderAPI = render(
      <MockMenu
        visible={true}
        items={menuItems.slice(0, 1)}
        onRequestClose={onRequestClose}>
        <View/>
      </MockMenu>,
    );

    const { output } = shallow(component.getByType(OverflowMenu));

    expect(output).toMatchSnapshot();
  });

});
