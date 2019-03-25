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
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  OverflowMenuItemType,
  OverflowMenuItem as OverflowMenuItemComponent,
  Props as OverflowMenuItemComponentProps,
} from './overflowMenuItem.component';
import {
  OverflowMenu as OverflowMenuComponent,
  Props as OverflowMenuComponentProps,
} from './overflowMenu.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const OverflowMenuItem = styled<OverflowMenuItemComponentProps>(OverflowMenuItemComponent);
const OverflowMenu = styled<OverflowMenuComponentProps>(OverflowMenuComponent);

const MockMenu = (props?: OverflowMenuComponentProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <OverflowMenu {...props} />
    </ApplicationProvider>
  );
};

const MockMenuItem = (props?: OverflowMenuItemComponentProps): React.ReactElement<ApplicationProviderProps> => {
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
        isLastItem={false}
        disabled={true}
        onPress={() => 1}
      />,
    );

    const { output } = shallow(component.getByType(OverflowMenuItemComponent));

    expect(output).toMatchSnapshot();
  });

  it('* menu item with "set-2" props', () => {
    const component: RenderAPI = render(
      <MockMenuItem
        text='Test Menu Item'
        isLastItem={true}
        disabled={false}
        onPress={() => 2}
      />,
    );

    const { output } = shallow(component.getByType(OverflowMenuItemComponent));

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
      return component.getByType(OverflowMenuItemComponent);
    });

    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');
    const inactive: ReactTestInstance = await waitForElement(() => {
      return component.getByType(OverflowMenuItemComponent);
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

    const { output } = shallow(component.getByType(OverflowMenuComponent));

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

    const { output } = shallow(component.getByType(OverflowMenuComponent));

    expect(output).toMatchSnapshot();
  });

});
