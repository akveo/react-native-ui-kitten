import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
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
import {
  DrawerItem,
  DrawerItemProps,
} from '../drawer/drawerItem.component';
import {
  mapping,
  theme,
} from '../support/tests';

const data: DrawerItemProps[] = [
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

    expect(component.getAllByType(DrawerItem).length).toEqual(3);
  });

  it('* item should render title', () => {
    const component: RenderAPI = renderComponent();

    expect(component.getByText('Item 1')).toBeTruthy();
    expect(component.getByText('Item 2')).toBeTruthy();
    expect(component.getByText('Item 3')).toBeTruthy();
  });

  it('* item should render description', () => {
    const drawerData: DrawerItemProps[] = [
      { title: 'Item 1', description: 'Description 1' },
      { title: 'Item 2', description: 'Description 2' },
      { title: 'Item 3', description: 'Description 3' },
    ];

    const component: RenderAPI = renderComponent({ data: drawerData });

    expect(component.getByText('Description 1')).toBeTruthy();
    expect(component.getByText('Description 2')).toBeTruthy();
    expect(component.getByText('Description 3')).toBeTruthy();
  });

  it('* item should render icon', () => {
    const source: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

    const icon = () => (
      <Image testID='@drawer-item-icon' source={source}/>
    );

    const drawerData: DrawerItemProps[] = [
      { title: 'Item 1', icon },
      { title: 'Item 2', icon },
      { title: 'Item 3', icon },
    ];

    const component: RenderAPI = renderComponent({ data: drawerData });

    expect(component.getAllByTestId('@drawer-item-icon').length).toEqual(3);
  });

  it('* item should render accessory view', () => {
    const source: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

    const accessory = () => (
      <Image testID='@drawer-item-accessory' source={source}/>
    );

    const drawerData: DrawerItemProps[] = [
      { title: 'Item 1', accessory },
      { title: 'Item 2', accessory },
      { title: 'Item 3', accessory },
    ];

    const component: RenderAPI = renderComponent({ data: drawerData });

    expect(component.getAllByTestId('@drawer-item-accessory').length).toEqual(3);
  });

  it('* should render custom item', () => {
    const renderItem = () => (
      <View testID='@drawer-custom-item'/>
    );

    const component: RenderAPI = renderComponent({ data, renderItem });

    expect(component.getAllByTestId('@drawer-custom-item').length).toEqual(3);
  });

  it('* should render header', () => {
    const header = () => (
      <View testID='@drawer-header'/>
    );

    const component: RenderAPI = renderComponent({ data, header });

    expect(component.getAllByTestId('@drawer-header').length).toBeTruthy();
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
