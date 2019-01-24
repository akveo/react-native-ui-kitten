import React from 'react';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import { ModalService } from './modal.service';
import { ModalPanel } from '../../../theme/component';

describe('@modal-service: service checks', () => {

  const ShowSingleModalTestId: string = '@modal/single';
  const ShowMultipleModalTestId: string = '@modal/multiple';
  const ShowModalWithBackDropAllowedId: string = '@modal/backdrop';
  const ModalTextTestId: string = '@modal/modal-text';
  const TestModal2Text: string = 'Test Modal 2';

  class TestApplication extends React.Component<any, any> {

    showModal: () => void = () => {
      const component =
        <TestModal
          text={'Test Modal 1'}
          onCloseModal={() => ModalService.hideModal()}
        />;
      ModalService.showDialog(component);
    };

    showMultipleModals: () => void = () => {
      const component1 =
        <TestModal
          text={TestModal2Text}
          onCloseModal={() => ModalService.hideModal()}
        />;
      const component2 =
        <TestModal
          text={'Test Modal 2'}
          onCloseModal={() => ModalService.hideModal()}
        />;
      ModalService.showDialog(component1);
      ModalService.showDialog(component2);
    };

    showBackDropAllowedModal: () => void = () => {
      const component =
        <TestModal
          text={'Test Modal Back Drop'}
          onCloseModal={() => ModalService.hideModal()}
        />;
      ModalService.showDialog(component, true);
    };

    render() {
      return (
        <ModalPanel>
          <View>
            <TouchableOpacity testID={ShowSingleModalTestId} onPress={this.showModal}>
              <Text>Show Single Modal</Text>
            </TouchableOpacity>
            <TouchableOpacity testID={ShowMultipleModalTestId} onPress={this.showMultipleModals}>
              <Text>Show Single Modal</Text>
            </TouchableOpacity>
            <TouchableOpacity testID={ShowModalWithBackDropAllowedId} onPress={this.showBackDropAllowedModal}>
              <Text>Show Back-Drop Allowed Modal</Text>
            </TouchableOpacity>
          </View>
        </ModalPanel>
      );
    }
  }

  interface TestModalProps {
    text: string;
    onCloseModal: () => void;
  }

  class TestModal extends React.Component<TestModalProps> {

    render() {
      return (
        <View style={{ width: 300, height: 300, backgroundColor: 'red' }}>
          <Text testID={ModalTextTestId}>{this.props.text}</Text>
          <Button title={'Close Modal'} onPress={this.props.onCloseModal}/>
        </View>
      );
    }
  }

  it('* showDialog have been called', () => {
    const spy = jest.spyOn(ModalService, 'showDialog');
    const application = render(<TestApplication/>);
    fireEvent.press(application.getByTestId(ShowSingleModalTestId));

    expect(spy).toHaveBeenCalled();
    expect(application).toMatchSnapshot();
  });

  it('* hideModal have been called', () => {
    const spy = jest.spyOn(ModalService, 'hideModal');
    const application = render(<TestApplication/>);
    fireEvent.press(application.getByTestId(ShowSingleModalTestId));
    fireEvent.press(application.getByType(Button));

    expect(spy).toHaveBeenCalled();
    expect(application).toMatchSnapshot();
  });

  it('* hide modal on back-drop', () => {
    const spy = jest.spyOn(ModalService, 'hideModal');
    const application = render(<TestApplication/>);
    fireEvent.press(application.getByTestId(ShowModalWithBackDropAllowedId));
    fireEvent.press(application.getByType(TouchableWithoutFeedback));

    expect(spy).toHaveBeenCalled();
  });

  it('* show multiple modals one by one', () => {
    const spy = jest.spyOn(ModalService, 'hideModal');
    const application = render(<TestApplication/>);
    fireEvent.press(application.getByTestId(ShowMultipleModalTestId));
    const expectedText: string = application.getByTestId(ModalTextTestId).props.children;

    expect(spy).toHaveBeenCalled();
    expect(expectedText).toBe(TestModal2Text);
    expect(application).toMatchSnapshot();
  });

});
