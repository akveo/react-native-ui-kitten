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
import { ModalResolver } from './modalResolver.component';

jest.useFakeTimers();

describe('@modal resolver component checks', () => {

  const MODAL_TEST_IDENTIFIER = (substring: string): string => {
    return `modal-test-identifier-${substring}`;
  };

  interface TestScreenProps {
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
          <ModalResolver
            visible={this.state.modalVisible}
            isBackDropAllowed={true}
            identifier={MODAL_TEST_IDENTIFIER('1')}
            onCloseModal={() => 1}>
            <View>
              <Text>
                Test2
              </Text>
            </View>
          </ModalResolver>,
        </View>
      );
    }
  }

  it('* modal resolver component renders properly', () => {
    const modal1: RenderAPI = render(
      <ModalResolver
        visible={true}
        isBackDropAllowed={false}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={() => 1}>
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
        isBackDropAllowed={false}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={() => 1}>
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
      isBackDropAllowed: false,
    };
    const modal = <ModalResolver {...modalPassingProps}/>;

    expect(modal.props.visible).toBe(modalPassingProps.visible);
    expect(modal.props.isBackDropAllowed).toBe(modalPassingProps.isBackDropAllowed);
  });

  it('* modal resolver closes on passed prop', () => {
    const onCloseModal = jest.fn();

    const component: RenderAPI = render(
      <ModalResolver
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
      </ModalResolver>,
    );


    const { output: openedOutput } = shallow(component.getByType(ModalResolver));
    expect(openedOutput).toMatchSnapshot();

    fireEvent.press(component.getByType(Button));
    expect(onCloseModal).toHaveBeenCalled();

    const { output: closedOutput } = shallow(component.getByType(ModalResolver));
    expect(closedOutput).toMatchSnapshot();
  });

  it('* modal resolver component close on backDrop checks', () => {
    const onCloseModal = jest.fn();

    const component: RenderAPI = render(
      <ModalResolver
        visible={true}
        isBackDropAllowed={true}
        identifier={MODAL_TEST_IDENTIFIER('1')}
        onCloseModal={onCloseModal}>
        <View>
          <Text>
            Test1
          </Text>
        </View>
      </ModalResolver>,
    );

    const { output: openedOutput } = shallow(component.getByType(ModalResolver));
    expect(openedOutput).toMatchSnapshot();

    fireEvent.press(component.getByType(TouchableOpacity));
    expect(onCloseModal).toHaveBeenCalled();

    const { output: closedOutput } = shallow(component.getByType(ModalResolver));
    expect(closedOutput).toMatchSnapshot();
  });

  it('* component styled with mappings', () => {
    const component: RenderAPI = render(
      <ModalResolver visible={true}>
        <Text>Test</Text>
      </ModalResolver>,
    );

    const { output } = shallow(component.getByType(ModalResolver));

    expect(output).toMatchSnapshot();
  });

});
