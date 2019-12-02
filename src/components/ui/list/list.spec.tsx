import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  fireEvent,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  List,
  ListProps,
} from './list.component';
import {
  ListItem,
  ListItemProps,
} from './listItem.component';
import {
  mapping,
  theme,
} from '../support/tests';

const data: any[] = Array(8);

const Mock = (props?: ListProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <List {...props} />
    </ApplicationProvider>
  );
};

const ItemMock = (props?: ListItemProps): React.ReactElement<ListItemProps> => {
  return (
    <ListItem {...props} />
  );
};

describe('@list: component checks', () => {

  it('* renders proper amount of data', () => {
    const item = () => {
      return (
        <ItemMock title='Title'/>
      );
    };

    const component: RenderAPI = render(
      <Mock
        data={data}
        renderItem={item}
      />,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItem);

    expect(items.length).toEqual(8);
  });

});

describe('@list-item: template matches snapshot', () => {

  const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

  it('* title', () => {
    const item = () => {
      return (
        <ItemMock title='Title'/>
      );
    };

    const component: RenderAPI = render(
      <Mock
        data={data}
        renderItem={item}
      />,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItem);
    const { output } = shallow(items[0]);

    expect(output).toMatchSnapshot();
  });

  it('* description', () => {
    const item = () => {
      return (
        <ItemMock description='Description'/>
      );
    };

    const component: RenderAPI = render(
      <Mock
        data={data}
        renderItem={item}
      />,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItem);
    const { output } = shallow(items[0]);

    expect(output).toMatchSnapshot();
  });

  it('* text styles', () => {
    const item = () => {
      return (
        <ItemMock
          title='Title'
          titleStyle={{
            fontSize: 22,
            lineHeight: 24,
          }}
          description='Description'
          descriptionStyle={{
            color: 'blue',
            letterSpacing: 6,
          }}
        />
      );
    };

    const component: RenderAPI = render(
      <Mock
        data={data}
        renderItem={item}
      />,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItem);
    const { output } = shallow(items[0]);

    expect(output).toMatchSnapshot();
  });

  it('* with icon', () => {
    const item = () => {
      return (
        <ItemMock
          title='Title'
          description='Description'
          icon={icon}
        />
      );
    };

    const icon = (style: StyleType): React.ReactElement<ImageProps> => {
      return (
        <Image
          style={style}
          source={iconSource}
        />
      );
    };

    const component: RenderAPI = render(
      <Mock
        data={data}
        renderItem={item}
      />,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItem);
    const { output } = shallow(items[0]);

    expect(output).toMatchSnapshot();
  });

  it('* with accessory', () => {
    const item = () => {
      return (
        <ItemMock
          title='Title'
          description='Description'
          accessory={accessory}
        />
      );
    };

    const accessory = (style: StyleType): React.ReactElement<ImageProps> => {
      return (
        <Image
          style={style}
          source={iconSource}
        />
      );
    };

    const component: RenderAPI = render(
      <Mock
        data={data}
        renderItem={item}
      />,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItem);
    const { output } = shallow(items[0]);

    expect(output).toMatchSnapshot();
  });

});

describe('@list-item: component checks', () => {

  it('* emits onPress with correct args', async () => {
    const pressIndex: number = 0;

    const onPress = jest.fn((index: number) => {
      expect(index).toEqual(pressIndex);
    });

    const item = () => {
      return (
        <ItemMock
          title='Title'
          onPress={onPress}
        />
      );
    };

    const component: RenderAPI = render(
      <Mock
        data={data}
        renderItem={item}
      />,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItem);
    const touchable: ReactTestInstance = items[pressIndex].findByType(TouchableOpacity);

    fireEvent.press(touchable);
  });

});
