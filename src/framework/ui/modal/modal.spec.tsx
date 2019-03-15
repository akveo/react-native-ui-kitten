import React from 'react';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  Modal,
  ModalAnimationType,
} from './modal.component';

jest.useFakeTimers();

describe('@modal component checks', () => {

  const MODAL_TEST_IDENTIFIER: (substring: string) => string = (substring: string): string =>
    `modal-test-identifier-${substring}`;

  interface TestScreenProps {
    modalAnimationType: ModalAnimationType;
    buttonTestId: string;
  }

  interface TestScreenState {
    modalVisible: boolean;
  }

  class TestScreen extends React.Component<TestScreenProps, TestScreenState> {

    public state: TestScreenState = {
      modalVisible: false,
    };

    private setModalVisible(value: boolean): void {
      this.setState({ modalVisible: value });
    }

    public render(): React.ReactNode {
      return (
        <View>
          <Button testID={this.props.buttonTestId}
                  title={'Open Modal'}
                  onPress={() => this.setModalVisible(true)}/>
          <Modal
            visible={this.state.modalVisible}
            isBackDropAllowed={true}
            identifier={MODAL_TEST_IDENTIFIER('1')}
            onCloseModal={() => 1}
            animationType={this.props.modalAnimationType}
            animationDuration={500}
          >
            <View><Text>Test2</Text></View>
          </Modal>,
        </View>
      );
    }
  }

  it('* modal component renders properly', () => {
    const modal1 = render(
      <Modal
        visible={true}
        isBackDropAllowed={false}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={() => 1}
      >
        <View><Text>Test1</Text></View>
      </Modal>,
    );
    const modal2 = render(
      <Modal
        visible={false}
        isBackDropAllowed={false}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={() => 1}>
        <View><Text>Test2</Text></View>
      </Modal>,
    );

    expect(modal1).toMatchSnapshot();
    expect(modal2).toMatchSnapshot();
  });

  it('* with animations', () => {
    const testApplication1 = render(<TestScreen modalAnimationType='slideInUp' buttonTestId='1'/>);
    const testApplication2 = render(<TestScreen modalAnimationType='fade' buttonTestId='2'/>);
    fireEvent.press(testApplication1.getByTestId('1'));
    fireEvent.press(testApplication2.getByTestId('2'));

    expect(testApplication1).toMatchSnapshot();
    expect(testApplication2).toMatchSnapshot();
  });

  it('* modal component props checks', () => {
    const modalPassingProps = {
      visible: true,
      isBackDropAllowed: false,
    };
    const modal = <Modal {...modalPassingProps}/>;

    expect(modal.props.visible).toBe(modalPassingProps.visible);
    expect(modal.props.isBackDropAllowed).toBe(modalPassingProps.isBackDropAllowed);
  });

  it('* modal closes on passed prop', () => {
    const onCloseModal = jest.fn();
    const component =
      <Modal
        visible={true}
        isBackDropAllowed={true}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={onCloseModal}
      >
        <View>
          <Text>Test1</Text>
          <Button title={'Close Modal'} onPress={onCloseModal}/>
        </View>
      </Modal>;
    const modal = render(component);
    expect(modal).toMatchSnapshot();
    fireEvent.press(modal.getByType(Button));
    expect(onCloseModal).toHaveBeenCalled();
    expect(modal).toMatchSnapshot();
  });

  it('* modal component close on backDrop checks', () => {
    const onCloseModal = jest.fn();
    const modal = render(
      <Modal
        visible={true}
        isBackDropAllowed={true}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={onCloseModal}>
        <View><Text>Test1</Text></View>
      </Modal>,
    );
    expect(modal).toMatchSnapshot();
    fireEvent.press(modal.getByType(TouchableOpacity));
    expect(modal).toMatchSnapshot();
    expect(onCloseModal).toHaveBeenCalled();
  });

  it('* component styled with mappings', () => {
    const component = render(
      <Modal visible={true}>
        <Text>Test</Text>
      </Modal>,
    );
    expect(component).toMatchSnapshot();
  });

});
