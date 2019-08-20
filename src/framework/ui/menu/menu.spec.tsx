import React from 'react';
import {
  Image,
  ImageProps,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import {
  ApplicationProvider,
  StyleType,
} from '@kitten/theme';
import { Menu } from './menu.component';
import {
  MenuItemType,
  MenuItem,
} from './menuItem.component';
import {
  mapping,
  theme,
} from '../support/tests';

jest.useFakeTimers();

const stringify = (obj: any): string => JSON.stringify(obj);

const Icon = (style: StyleType): React.ReactElement<ImageProps> => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
  />
);

const data: MenuItemType[] = [
  { title: 'Option 1', icon: Icon },
  { title: 'Option 2', disabled: true },
  {
    title: 'Option 3',
    subItems: [
      { title: 'Option 31', disabled: true },
      { title: 'Option 32' },
      { title: 'Option 33' },
    ],
  },
  { title: 'Option 4', icon: Icon },
  { title: 'Option 5' },
  { title: 'Option 6' },
  { title: 'Option 8' },
  { title: 'Option 9' },
];

interface Props {

}

interface State {
  selectedItem: MenuItemType;
}

class TestApplication extends React.Component<Props, State> {

  public state: State = {
    selectedItem: null,
  };

  private onSelect = (selectedItem: MenuItemType): void => {
    this.setState({ selectedItem });
  };

  public render(): React.ReactNode {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <Menu
          data={data}
          selectedItem={this.state.selectedItem}
          onSelect={this.onSelect}
        />
      </ApplicationProvider>
    );
  }
}

describe('@ menu component checks', () => {

  it('* menu item press props checks', () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const onLongPress = jest.fn();
    const title: string = 'Option';

    const menuItem: RenderAPI = render(
      <ApplicationProvider mapping={mapping} theme={theme}>
        <MenuItem
          title={title}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onLongPress={onLongPress}
        />
      </ApplicationProvider>,
    );

    fireEvent(menuItem.getAllByText(title)[0], 'press');
    fireEvent(menuItem.getAllByText(title)[0], 'pressIn');
    fireEvent(menuItem.getAllByText(title)[0], 'pressOut');
    fireEvent(menuItem.getAllByText(title)[0], 'longPress');

    expect(onPress).toHaveBeenCalled();
    expect(onPressIn).toHaveBeenCalled();
    expect(onPressOut).toHaveBeenCalled();
    expect(onLongPress).toHaveBeenCalled();
  });

  it('* menu/menu-item props passing checks', () => {
    const expectedSelectedItem: MenuItemType = { title: 'Option 1' };
    const expectedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/star.png';
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    fireEvent.press(application.getAllByText('Option 1')[0]);

    const { selectedItem } = application.getByType(Menu).props;
    const { children } = application.getAllByText('Option 1')[0].props;
    const { source } = application.getAllByType(Image)[0].props;

    expect(stringify(selectedItem)).toBe(stringify(expectedSelectedItem));
    expect(children).toBe(expectedSelectedItem.title);
    expect(source.uri).toBe(expectedUri);
  });

  it('* group menu works properly', () => {
    const expectedSelectedItem: MenuItemType = { title: 'Option 32' };
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    fireEvent.press(application.getAllByText('Option 3')[0]);
    const { selectedItem: selectedItem1 } = application.getByType(Menu).props;
    expect(selectedItem1).toBeNull();

    fireEvent.press(application.getAllByText('Option 32')[0]);
    const { selectedItem: selectedItem2 } = application.getByType(Menu).props;
    expect(stringify(selectedItem2)).toBe(stringify(expectedSelectedItem));
  });

});



