import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
} from 'react-native-testing-library';
import {
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  Drawer,
  DrawerProps,
} from '../drawer/drawer.component';
import { DrawerHeaderFooter } from './drawerHeaderFooter.component';
import {
  MenuItemType,
  MenuItem,
} from '../menu/menuItem.component';
import {
  mapping,
  theme,
} from '../support/tests';

const data: MenuItemType[] = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
];

const Mock = (props?: DrawerProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <Drawer data={data} {...props} />
    </ApplicationProvider>
  );
};

const renderComponent = (props?: DrawerProps): RenderAPI => {
  return render(
    <Mock {...props}/>,
  );
};

describe('@drawer: component checks', () => {

  it('* should render proper number of items', () => {
    const component: RenderAPI = renderComponent();

    expect(component.getAllByType(MenuItem).length).toEqual(3);
  });

  it('* item should render title', () => {
    const component: RenderAPI = renderComponent();

    expect(component.getByText('Item 1')).toBeTruthy();
    expect(component.getByText('Item 2')).toBeTruthy();
    expect(component.getByText('Item 3')).toBeTruthy();
  });

  it('* item should render icon', () => {
    const source: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

    const icon = () => (
      <Image testID='@drawer-item-icon' source={source}/>
    );

    const drawerData: MenuItemType[] = [
      { title: 'Item 1', icon },
      { title: 'Item 2', icon },
      { title: 'Item 3', icon },
    ];

    const component: RenderAPI = renderComponent({ data: drawerData, onSelect: () => 1 });

    expect(component.getAllByTestId('@drawer-item-icon').length).toEqual(3);
  });

  it('* item should render accessory view', () => {
    const source: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

    const accessory = () => (
      <Image testID='@drawer-item-accessory' source={source}/>
    );

    const drawerData: MenuItemType[] = [
      { title: 'Item 1', accessory },
      { title: 'Item 2', accessory },
      { title: 'Item 3', accessory },
    ];

    const component: RenderAPI = renderComponent({ data: drawerData, onSelect: () => 1 });

    expect(component.getAllByTestId('@drawer-item-accessory').length).toEqual(3);
  });

  it('* should render header', () => {
    const header = () => (
      <DrawerHeaderFooter testID='@drawer-header'/>
    );

    const component: RenderAPI = renderComponent({ data, header, onSelect: () => 1 });

    expect(component.getAllByTestId('@drawer-header').length).toBeTruthy();
  });

  it('* should render footer', () => {
    const footer = () => (
      <DrawerHeaderFooter testID='@drawer-footer'/>
    );

    const component: RenderAPI = renderComponent({ data, footer, onSelect: () => 1 });

    expect(component.getAllByTestId('@drawer-footer').length).toBeTruthy();
  });

  it('* should call onSelect', () => {
    const pressIndex: number = 1;

    const onSelect = jest.fn((index: number) => {
      expect(index).toEqual(pressIndex);
    });

    const component: RenderAPI = renderComponent({ data, onSelect });

    fireEvent.press(component.getAllByType(TouchableOpacity)[pressIndex]);
  });

});
