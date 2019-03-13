import React from 'react';
import {
  Image,
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
  StyleProvider,
  StyleProviderProps,
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
import * as config from './overflowMenu.spec.config';

const OverflowMenuItem =
  styled<OverflowMenuItemComponent, OverflowMenuItemComponentProps>(OverflowMenuItemComponent);
const OverflowMenu =
  styled<OverflowMenuComponent, OverflowMenuComponentProps>(OverflowMenuComponent);

const MockMenu = (props?: OverflowMenuComponentProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <OverflowMenu {...props} />
  </StyleProvider>
);

const MockMenuItem = (props?: OverflowMenuItemComponentProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <OverflowMenuItem {...props} />
  </StyleProvider>
);

const iconUri1: string = 'https://akveo.github.io/eva-icons/fill/png/128/star.png';
const iconUri2: string = 'https://akveo.github.io/eva-icons/fill/png/128/alert-triangle.png';
const iconUri3: string = 'https://akveo.github.io/eva-icons/fill/png/128/book-open.png';

const menuItems: OverflowMenuItemType[] = [
  {
    text: 'Menu Item 1',
    icon: (style: StyleType) => <Image source={{ uri: iconUri1 }} style={style}/>,
  },
  {
    text: 'Menu Item 2',
    icon: (style: StyleType) => <Image source={{ uri: iconUri2 }} style={style}/>,
    disabled: true,
  },
  {
    text: 'Menu Item 3',
  },
  {
    text: 'Menu Item 4',
    icon: (style: StyleType) => <Image source={{ uri: iconUri3 }} style={style}/>,
  },
];

const menuItemsSingle: OverflowMenuItemType[] = [{
  text: 'Menu Item 1',
  icon: (style: StyleType) => <Image source={{ uri: iconUri1 }} style={style}/>,
}];

describe('@overflow-menu-item: component checks', () => {

  it('* menu item with "set-1" props', () => {
    const component: RenderAPI = render(
      <MockMenuItem
        text='Test Menu Item'
        icon={(style: StyleType) => <Image source={{ uri: iconUri1 }} style={style}/>}
        // size='small'
        isLastItem={false}
        disabled={true}
        onPress={() => 1}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('* menu item with "set-2" props', () => {
    const component: RenderAPI = render(
      <MockMenuItem
        text='Test Menu Item'
        size='big'
        isLastItem={true}
        disabled={false}
        onPress={() => 2}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('* menu item onPress prop checks', () => {
    const menuItemTestId = 'menu-item-1';
    const onPress = jest.fn();
    const component: RenderAPI = render(
      <MockMenuItem
        text='Test Menu Item'
        icon={(style: StyleType) => <Image source={{ uri: iconUri1 }} style={style}/>}
        size='small'
        disabled={false}
        onPress={onPress}
        testID={menuItemTestId}
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
        icon={(style: StyleType) => <Image source={{ uri: iconUri1 }} style={style}/>}
        size='small'
        disabled={false}
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
        icon={(style: StyleType) => <Image source={{ uri: iconUri1 }} style={style}/>}
        size='small'
        disabled={false}
        onPress={() => 1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}/>,
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
    const component: RenderAPI = render(
      <MockMenu
        visible={true}
        items={menuItems}
        onRequestClose={() => {
        }}>
        <View/>
      </MockMenu>,
    );
    expect(component).toMatchSnapshot();
  });

  it('* single menu-item', () => {
    const component: RenderAPI = render(
      <MockMenu
        visible={true}
        items={menuItemsSingle}
        onRequestClose={() => {
        }}>
        <View/>
      </MockMenu>,
    );
    expect(component).toMatchSnapshot();
  });

});
