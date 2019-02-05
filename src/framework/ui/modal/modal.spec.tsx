import React from 'react';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import { Modal } from './modal.component';

describe('@modal component checks', () => {

  const MODAL_TEST_IDENTIFIER: (substring: string) => string = (substring: string): string =>
    `modal-test-identifier-${substring}`;

  it('* modal component renders properly', () => {
    const modal1 = render(<Modal
      visible={true}
      component={<View><Text>Test1</Text></View>}
      isBackDropAllowed={false}
      identifier={MODAL_TEST_IDENTIFIER('1')}
      onCloseModal={() => 1}/>);
    const modal2 = render(<Modal
      visible={false}
      component={<View><Text>Test2</Text></View>}
      isBackDropAllowed={false}
      identifier={MODAL_TEST_IDENTIFIER('1')}
      onCloseModal={() => 1}/>);

    expect(modal1).toMatchSnapshot();
    expect(modal2).toMatchSnapshot();
  });

  it('* modal component props checks', () => {
    const modalPassingProps = {
      visible: true,
      component: <View><Text>Test1</Text></View>,
      isBackDropAllowed: false,
    };
    const modal = <Modal {...modalPassingProps}/>;

    expect(modal.props.visible).toBe(modalPassingProps.visible);
    expect(modal.props.component).toBe(modalPassingProps.component);
    expect(modal.props.isBackDropAllowed).toBe(modalPassingProps.isBackDropAllowed);
  });

  it('* modal closes on passed prop', () => {
    const onCloseModal = jest.fn();
    const component = <Modal
      visible={true}
      component={<View>
        <Text>Test1</Text>
        <Button title={'Close Modal'} onPress={onCloseModal}/>
      </View>}
      isBackDropAllowed={true}
      identifier={MODAL_TEST_IDENTIFIER('1')}
      onCloseModal={onCloseModal}/>;
    const modal = render(component);
    expect(modal).toMatchSnapshot();
    fireEvent.press(modal.getByType(Button));
    expect(onCloseModal).toHaveBeenCalled();
    expect(modal).toMatchSnapshot();
  });

  it('* modal component close on backDrop checks', () => {
    const onCloseModal = jest.fn();
    const modal = render(<Modal
      visible={true}
      component={<View><Text>Test1</Text></View>}
      isBackDropAllowed={true}
      identifier={MODAL_TEST_IDENTIFIER('1')}
      onCloseModal={onCloseModal}/>);
    expect(modal).toMatchSnapshot();
    fireEvent.press(modal.getByType(TouchableWithoutFeedback));
    expect(modal).toMatchSnapshot();
    expect(onCloseModal).toHaveBeenCalled();
  });

});
