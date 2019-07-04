import React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  ViewProps,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
} from 'react-native-testing-library';
import {
  Modal,
  ModalProps,
} from './modal.component';
import { StyleType } from '../../../../dist/tsc-out/framework/theme';

const buttonShowModalTestId: string = '@button-show-modal';
const buttonHideModalTestId: string = '@button-hide-modal';
const stringify = (obj: Object): string => JSON.stringify(obj);

interface TestScreenState {
  modalVisible: boolean;
}

interface TestScreenProps {
  modalStyle?: StyleType;
}

class TestScreen extends React.Component<TestScreenProps & ViewProps, TestScreenState> {

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
          title='Show Modal'
          testID={buttonShowModalTestId}
          onPress={() => this.setModalVisible(true)}
        />
        <Button
          title='Show Modal'
          testID={buttonHideModalTestId}
          onPress={() => this.setModalVisible(false)}
        />
        <Modal
          style={this.props.modalStyle}
          visible={this.state.modalVisible}>
          <Text>Test Modal</Text>
        </Modal>
      </View>
    );
  }
}

describe('@modal component checks', () => {

  it('* modal component props checks', () => {
    const modalPassingProps: ModalProps = {
      visible: true,
      children: [<View><Text>Test Modal</Text></View>],
      closeOnBackdrop: false,
      backdropStyle: {
        backgroundColor: 'black',
        opacity: 0.5,
      },
    };
    const modal = <Modal {...modalPassingProps}/>;

    expect(modal.props.visible).toBe(modalPassingProps.visible);
    expect(modal.props.closeOnBackdrop).toBe(modalPassingProps.closeOnBackdrop);
    expect(modal.props.children).toBe(modalPassingProps.children);
    expect(modal.props.backdropStyle).toBe(modalPassingProps.backdropStyle);
  });

  it('* modal shows/hides properly', () => {
    const component: RenderAPI = render(<TestScreen/>);

    fireEvent.press(component.getByTestId(buttonShowModalTestId));
    expect(component.getByType(Modal).props.visible).toBe(true);

    fireEvent.press(component.getByTestId(buttonHideModalTestId));
    expect(component.getByType(Modal).props.visible).toBe(false);
  });

  it('* modal default center placement calculated properly', () => {
    const { width, height } = Dimensions.get('screen');
    const modalStyle: StyleType = {
      width: 200,
      height: 200,
    };
    const component: RenderAPI = render(
      <TestScreen modalStyle={modalStyle}/>,
    );

    fireEvent.press(component.getByTestId(buttonShowModalTestId));
    fireEvent.press(component.getByTestId(buttonHideModalTestId));

    const modalInstance: any = component.getByType(Modal).instance;

    const absoluteStyle: StyleType = modalInstance.getAbsoluteRelatedStyle();
    const expectedStyle: StyleType = {
      top: (height - modalInstance.contentHeight) / 2,
      left: (width - modalInstance.contentWidth) / 2,
    };

    expect(stringify(absoluteStyle)).toBe(stringify(expectedStyle));
  });

});
