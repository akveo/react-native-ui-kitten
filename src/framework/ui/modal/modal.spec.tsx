import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  shallow,
} from 'react-native-testing-library';
import {
  Modal,
  ModalAnimationType,
} from './modal.component';

jest.useFakeTimers();

describe('@modal component checks', () => {

  const MODAL_TEST_IDENTIFIER = (substring: string): string => {
    return `modal-test-identifier-${substring}`;
  };

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

    private setModalVisible(modalVisible: boolean): void {
      this.setState({ modalVisible });
    }

    public render(): React.ReactNode {
      return (
        <View>
          <Button
            testID={this.props.buttonTestId}
            title='Open Modal'
            onPress={() => this.setModalVisible(true)}/>
          <Modal
            visible={this.state.modalVisible}
            isBackDropAllowed={true}
            identifier={MODAL_TEST_IDENTIFIER('1')}
            onCloseModal={() => 1}
            animationType={this.props.modalAnimationType}
            animationDuration={500}>
            <View>
              <Text>
                Test2
              </Text>
            </View>
          </Modal>,
        </View>
      );
    }
  }

  it('* modal component renders properly', () => {
    const modal1: RenderAPI = render(
      <Modal
        visible={true}
        isBackDropAllowed={false}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={() => 1}>
        <View>
          <Text>
            Test1
          </Text>
        </View>
      </Modal>,
    );

    const modal2: RenderAPI = render(
      <Modal
        visible={false}
        isBackDropAllowed={false}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={() => 1}>
        <View>
          <Text>
            Test2
          </Text>
        </View>
      </Modal>,
    );

    const { output: firstOutput } = shallow(modal1.getByType(Modal));
    const { output: secondOutput } = shallow(modal2.getByType(Modal));

    expect(firstOutput).toMatchSnapshot();
    expect(secondOutput).toMatchSnapshot();
  });

  it('* with animations', () => {
    const testApplication1: RenderAPI = render(
      <TestScreen
        modalAnimationType='slideInUp'
        buttonTestId='1'
      />,
    );

    const testApplication2: RenderAPI = render(
      <TestScreen
        modalAnimationType='fade'
        buttonTestId='2'
      />,
    );

    fireEvent.press(testApplication1.getByTestId('1'));
    fireEvent.press(testApplication2.getByTestId('2'));

    const { output: firstOutput } = shallow(testApplication1.getByType(Modal));
    const { output: secondOutput } = shallow(testApplication2.getByType(Modal));

    expect(firstOutput).toMatchSnapshot();
    expect(secondOutput).toMatchSnapshot();
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

    const component: RenderAPI = render(
      <Modal
        visible={true}
        isBackDropAllowed={true}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={onCloseModal}>
        <View>
          <Text>Test1</Text>
          <Button
            title='Close Modal'
            onPress={onCloseModal}
          />
        </View>
      </Modal>,
    );


    const { output: openedOutput } = shallow(component.getByType(Modal));
    expect(openedOutput).toMatchSnapshot();

    fireEvent.press(component.getByType(Button));
    expect(onCloseModal).toHaveBeenCalled();

    const { output: closedOutput } = shallow(component.getByType(Modal));
    expect(closedOutput).toMatchSnapshot();
  });

  it('* modal component close on backDrop checks', () => {
    const onCloseModal = jest.fn();

    const component: RenderAPI = render(
      <Modal
        visible={true}
        isBackDropAllowed={true}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={onCloseModal}>
        <View>
          <Text>
            Test1
          </Text>
        </View>
      </Modal>,
    );

    const { output: openedOutput } = shallow(component.getByType(Modal));
    expect(openedOutput).toMatchSnapshot();

    fireEvent.press(component.getByType(TouchableOpacity));
    expect(onCloseModal).toHaveBeenCalled();

    const { output: closedOutput } = shallow(component.getByType(Modal));
    expect(closedOutput).toMatchSnapshot();
  });

  it('* component styled with mappings', () => {
    const component: RenderAPI = render(
      <Modal visible={true}>
        <Text>Test</Text>
      </Modal>,
    );

    const { output } = shallow(component.getByType(Modal));

    expect(output).toMatchSnapshot();
  });

});
