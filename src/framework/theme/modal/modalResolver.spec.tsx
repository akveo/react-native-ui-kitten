import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  shallow,
} from 'react-native-testing-library';
import { ModalResolver } from './modalResolver.component';

jest.useFakeTimers();

describe('@modal resolver component checks', () => {

  it('* modal resolver component renders properly', () => {
    const modal1: RenderAPI = render(
      <ModalResolver
        visible={true}
        allowBackdrop={false}>
        <View>
          <Text>
            Test1
          </Text>
        </View>
      </ModalResolver>,
    );

    const modal2: RenderAPI = render(
      <ModalResolver
        visible={false}
        allowBackdrop={false}>
        <View>
          <Text>
            Test2
          </Text>
        </View>
      </ModalResolver>,
    );

    const { output: firstOutput } = shallow(modal1.getByType(ModalResolver));
    const { output: secondOutput } = shallow(modal2.getByType(ModalResolver));

    expect(firstOutput).toMatchSnapshot();
    expect(secondOutput).toMatchSnapshot();
  });

  it('* modal resolver component props checks', () => {
    const modalPassingProps = {
      visible: true,
      allowBackdrop: false,
    };
    const modal = <ModalResolver {...modalPassingProps}/>;

    expect(modal.props.visible).toBe(modalPassingProps.visible);
    expect(modal.props.allowBackdrop).toBe(modalPassingProps.allowBackdrop);
  });

  it('* modal resolver backdrop press calling checks', () => {
    const onBackdropPress = jest.fn();

    const component: RenderAPI = render(
      <ModalResolver
        visible={true}
        allowBackdrop={true}>
        <View>
          <Text>Test1</Text>
          <Button
            title='Close Modal'
            onPress={onBackdropPress}
          />
        </View>
      </ModalResolver>,
    );

    fireEvent.press(component.getByType(Button));
    expect(onBackdropPress).toHaveBeenCalled();
  });

});
