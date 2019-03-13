import React from 'react';
import {
  Image,
  ImageProps,
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
  styled,
  StyleProvider,
  StyleProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  List as ListComponent,
  Props as ListProps,
} from './list.component';
import {
  ListItem as ListItemComponent,
  Props as ListItemProps,
} from './listItem.component';
import * as config from './list.spec.config';

const List = styled<ListComponent, ListProps>(ListComponent);
const ListItem = styled<ListItemComponent, ListItemProps>(ListItemComponent);

const data: any[] = Array(8);

const Mock = (props?: ListProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <List {...props} />
  </StyleProvider>
);

const ItemMock = (props?: ListItemProps): React.ReactElement<ListItemProps> => (
  <ListItem {...props} />
);

describe('@list: component checks', () => {

  it('* renders proper amount of data', () => {
    const item = () => (
      <ItemMock title='Title'/>
    );

    const component: RenderAPI = render(
      <Mock data={data} renderItem={item}/>,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItemComponent);

    expect(items.length).toEqual(8);
  });

});

describe('@list-item: template matches snapshot', () => {

  it('* title', () => {
    const item = () => (
      <ItemMock title='Title'/>
    );

    const component: RenderAPI = render(
      <Mock data={data} renderItem={item}/>,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItemComponent);
    const { output } = shallow(items[0]);

    expect(output).toMatchSnapshot();
  });

  it('* description', () => {
    const item = () => (
      <ItemMock title='Title'/>
    );

    const component: RenderAPI = render(
      <Mock data={data} renderItem={item}/>,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItemComponent);
    const { output } = shallow(items[0]);

    expect(output).toMatchSnapshot();
  });

  it('* with icon', () => {
    const item = () => (
      <ItemMock
        title='Title'
        description='Description'
        icon={icon}
      />
    );

    const icon = (style: StyleType): React.ReactElement<ImageProps> => (
      <Image style={style} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
    );

    const component: RenderAPI = render(
      <Mock data={data} renderItem={item}/>,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItemComponent);
    const { output } = shallow(items[0]);

    expect(output).toMatchSnapshot();
  });

  it('* with accessory', () => {
    const item = () => (
      <ItemMock
        title='Title'
        description='Description'
        accessory={accessory}
      />
    );

    const accessory = (style: StyleType): React.ReactElement<ImageProps> => (
      <Image style={style} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
    );

    const component: RenderAPI = render(
      <Mock data={data} renderItem={item}/>,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItemComponent);
    const { output } = shallow(items[0]);

    expect(output).toMatchSnapshot();
  });

});

describe('@list-item: component checks', () => {

  it('* emits onPress with correct args', async () => {
    const pressIndex: number = 0;

    const onPress = jest.fn((args: any[]) => {
      expect(args).toEqual(pressIndex);
    });

    const item = () => (
      <ItemMock
        title='Title'
        onPress={onPress}
      />
    );

    const component: RenderAPI = render(
      <Mock data={data} renderItem={item}/>,
    );

    const items: ReactTestInstance[] = component.getAllByType(ListItemComponent);
    const touchable: ReactTestInstance = items[pressIndex].findByType(TouchableOpacity);

    fireEvent.press(touchable);
  });

});
