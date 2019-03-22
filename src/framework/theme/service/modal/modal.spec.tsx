import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Button,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import { ModalPanel } from '../../../theme/component';
import { ModalService } from './modal.service';

jest.useFakeTimers();

describe('@modal-service: service checks', () => {

  const ShowSingleModalTestId: string = '@modal/single';
  const ShowMultipleModalTestId: string = '@modal/multiple';
  const ShowModalWithBackDropAllowedId: string = '@modal/backdrop';

  const textId = (id: number): string => {
    return `@modal/text-${id}`;
  };

  class TestApplication extends React.Component<any, any> {

    private showModal = () => {
      ModalService.show(
        <TestModal
          text={textId(1)}
          onCloseModal={this.props.onCloseModal}
          textTestId={textId(1)}
        />,
      );
    };

    private showMultipleModals = () => {
      ModalService.show(
        <TestModal
          text={textId(1)}
          onCloseModal={this.props.onCloseModal}
          textTestId={textId(1)}
        />,
      );

      ModalService.show(
        <TestModal
          text={textId(2)}
          onCloseModal={this.props.onCloseModal}
          textTestId={textId(2)}
        />,
      );
    };

    private showBackDropAllowedModal = () => {
      ModalService.show(
        <TestModal
          text={textId(0)}
          onCloseModal={this.props.onCloseModal}
          textTestId={textId(0)}
        />, true);
    };

    public render(): React.ReactNode {
      return (
        <ModalPanel>
          <View>
            <TouchableOpacity
              testID={ShowSingleModalTestId}
              onPress={this.showModal}>
              <Text>
                Show Single Modal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={ShowMultipleModalTestId}
              onPress={this.showMultipleModals}>
              <Text
              >Show Single Modal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={ShowModalWithBackDropAllowedId}
              onPress={this.showBackDropAllowedModal}>
              <Text>
                Show Back-Drop Allowed Modal
              </Text>
            </TouchableOpacity>
          </View>
        </ModalPanel>
      );
    }
  }

  interface TestModalProps {
    text: string;
    textTestId: string;
    onCloseModal?: () => void;
  }

  class TestModal extends React.Component<TestModalProps> {

    public render(): React.ReactElement<TestModalProps> {
      return (
        <View style={{
          width: 300,
          height: 300,
          backgroundColor: 'red',
        }}>
          <Text testID={this.props.textTestId}>
            {this.props.text}
          </Text>
          <Button
            title='Close Modal'
            onPress={this.props.onCloseModal}
          />
        </View>
      );
    }
  }

  it('* showDialog have been called', () => {
    const spy = jest.spyOn(ModalService, 'show');
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    fireEvent.press(application.getByTestId(ShowSingleModalTestId));

    expect(spy).toHaveBeenCalled();
  });

  it('* show multiple modals one by one', () => {
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    fireEvent.press(application.getByTestId(ShowMultipleModalTestId));

    const modalInstance: ReactTestInstance = application.getByTestId(textId(2));
    const expectedText: string = modalInstance.props.children;

    expect(expectedText).toBe(textId(2));
  });

  it('* unexpected branch cover', () => {
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    ModalService.mount(null);

    expect(ModalService.panel).toBe(null);

    fireEvent.press(application.getByTestId(ShowSingleModalTestId));

    expect(application).toMatchSnapshot();
  });

});
