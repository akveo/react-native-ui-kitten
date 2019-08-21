import React from 'react';
import {
  Image,
  ImageProps,
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
import { MenuService } from './menu.service';
import {
  mapping,
  theme,
} from '../support/tests';

jest.useFakeTimers();

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

interface State {
  selectedIndex: number;
}

class TestApplication extends React.Component<any, State> {

  public state: State = {
    selectedIndex: null,
  };

  private onSelect = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  };

  public render(): React.ReactNode {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <Menu
          data={data}
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onSelect}
        />
      </ApplicationProvider>
    );
  }
}

describe('@ menu component checks', () => {

  it('* menu item onPress prop checks', () => {
    const onPress = jest.fn();
    const title: string = 'Option';

    const menuItem: RenderAPI = render(
      <ApplicationProvider mapping={mapping} theme={theme}>
        <MenuItem
          title={title}
          onPress={onPress}
        />
      </ApplicationProvider>,
    );

    fireEvent(menuItem.getAllByText(title)[0], 'press');

    expect(onPress).toHaveBeenCalled();
  });

  it('* menu item onPressIn prop checks', () => {
    const onPressIn = jest.fn();
    const title: string = 'Option';

    const menuItem: RenderAPI = render(
      <ApplicationProvider mapping={mapping} theme={theme}>
        <MenuItem
          title={title}
          onPressIn={onPressIn}
        />
      </ApplicationProvider>,
    );

    fireEvent(menuItem.getAllByText(title)[0], 'pressIn');

    expect(onPressIn).toHaveBeenCalled();
  });

  it('* menu item onPressOut prop checks', () => {
    const onPressOut = jest.fn();
    const title: string = 'Option';

    const menuItem: RenderAPI = render(
      <ApplicationProvider mapping={mapping} theme={theme}>
        <MenuItem
          title={title}
          onPressOut={onPressOut}
        />
      </ApplicationProvider>,
    );

    fireEvent(menuItem.getAllByText(title)[0], 'pressOut');

    expect(onPressOut).toHaveBeenCalled();
  });

  it('* menu item onLongPress prop checks', () => {
    const onLongPress = jest.fn();
    const title: string = 'Option';

    const menuItem: RenderAPI = render(
      <ApplicationProvider mapping={mapping} theme={theme}>
        <MenuItem
          title={title}
          onLongPress={onLongPress}
        />
      </ApplicationProvider>,
    );

    fireEvent(menuItem.getAllByText(title)[0], 'press');
    fireEvent(menuItem.getAllByText(title)[0], 'pressIn');
    fireEvent(menuItem.getAllByText(title)[0], 'pressOut');
    fireEvent(menuItem.getAllByText(title)[0], 'longPress');

    expect(onLongPress).toHaveBeenCalled();
  });

  it('* menu onSelect works properly', () => {
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    fireEvent.press(application.getAllByText('Option 1')[0]);

    const { selectedIndex } = application.getByType(Menu).props;

    expect(selectedIndex).toBe(0);
  });

  it('* menu-item text renders properly', () => {
    const item: MenuItemType = { title: 'Option 1' };
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    const { children } = application.getAllByText(item.title)[0].props;

    expect(children).toBe(item.title);
  });

  it('* menu-item icon renders properly', () => {
    const expectedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/star.png';
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    const { source } = application.getAllByType(Image)[0].props;

    expect(source.uri).toBe(expectedUri);
  });

  it('* group menu works properly', () => {
    const expectedSelectedItem: MenuItemType = { title: 'Option 32' };
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    fireEvent.press(application.getAllByText('Option 3')[0]);
    const { selectedIndex: selectedIndex1 } = application.getByType(Menu).props;
    expect(selectedIndex1).toBeNull();

    fireEvent.press(application.getAllByText('Option 32')[0]);
    const { selectedIndex: selectedIndex2 } = application.getByType(Menu).props;
    expect(selectedIndex2).toBe(3);
  });

});

describe('@ menu-service checks', () => {

  const stringify = (obj: any): string => JSON.stringify(obj);

  const menuData: MenuItemType[] = [
    { title: 'Item 1' },
    {
      title: 'Item 2',
      subItems: [
        { title: 'Item 21' },
        { title: 'Item 22' },
        { title: 'Item 23' },
      ],
    },
    { title: 'Item 3' },
  ];

  it('* setIndexes method', () => {
    const expectedMenuItems: MenuItemType[] = [
      {
        title: 'Item 1',
        menuIndex: 0,
      },
      {
        title: 'Item 2',
        subItems: [
          {
            title: 'Item 21',
            menuIndex: 1,
          },
          {
            title: 'Item 22',
            menuIndex: 2,
          },
          {
            title: 'Item 23',
            menuIndex: 3,
          },
        ],
      },
      {
        title: 'Item 3',
        menuIndex: 4,
      },
    ];
    const service: MenuService = new MenuService();
    const result: MenuItemType[] = service.setIndexes(menuData);

    expect(stringify(result)).toBe(stringify(expectedMenuItems));
  });

});



