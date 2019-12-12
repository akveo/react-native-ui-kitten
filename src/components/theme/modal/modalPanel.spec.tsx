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
import { ReactTestInstance } from 'react-test-renderer';
import { ModalPanel } from './modalPanel.component';
import {
  ModalPresentingConfig,
  ModalService,
} from './modal.service';

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
        {
          allowBackdrop: false,
          onBackdropPress: () => null,
        },
      );
    };

    private showMultipleModals = () => {
      ModalService.show(
        <TestModal
          text={textId(1)}
          onCloseModal={this.props.onCloseModal}
          textTestId={textId(1)}
        />,
        {
          allowBackdrop: false,
          onBackdropPress: () => null,
        },
      );

      ModalService.show(
        <TestModal
          text={textId(2)}
          onCloseModal={this.props.onCloseModal}
          textTestId={textId(2)}
        />,
        {
          allowBackdrop: false,
          onBackdropPress: () => null,
        },
      );
    };

    private showBackDropAllowedModal = () => {
      ModalService.show(
        <TestModal
          text={textId(0)}
          onCloseModal={this.props.onCloseModal}
          textTestId={textId(0)}
        />,
        {
          allowBackdrop: true,
          onBackdropPress: () => null,
        },
      );
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

jest.useFakeTimers();

describe('@modal panel checks', () => {

  const showModalTestId: string = '@modal/show';
  const hideModalTestIdInner: string = '@modal/hide-inner';
  const hideModalTestIdOuter: string = '@modal/hide-outer';

  interface HooksProps {
    componentDidMount?: () => void;
    componentWillUnmount?: () => void;
  }

  class ModalPanelTest extends React.Component<HooksProps> {

    private modalId: string = '';

    public componentDidMount(): void {
      if (this.props.componentDidMount) {
        this.props.componentDidMount();
      }
    }

    public componentWillUnmount() {
      if (this.props.componentWillUnmount) {
        this.props.componentWillUnmount();
      }
    }

    public showModal() {
      this.modalId = ModalService.show(
        <TestModal onBackdropPress={this.hideModal}/>,
        {
          allowBackdrop: true,
          onBackdropPress: () => null,
        },
      );
    }

    public hideModal() {
      ModalService.hide(this.modalId);
    }

    public render(): React.ReactNode {
      return (
        <ModalPanel>
          <View>
            <Text>
              Modal Panel Test
            </Text>
          </View>
          <Button
            title='Open Modal'
            onPress={() => this.showModal()}
            testID={showModalTestId}
          />
          <Button
            title='Hide Modal'
            onPress={() => this.hideModal()}
            testID={hideModalTestIdOuter}
          />
        </ModalPanel>
      );
    }
  }

  class TestModal extends React.Component<ModalPresentingConfig> {

    public render(): React.ReactNode {
      return (
        <View>
          <Button
            title='Close Modal'
            onPress={this.props.onBackdropPress}
            testID={hideModalTestIdInner}
          />
        </View>
      );
    }
  }

  it('* modal panel renders properly', () => {
    const component: RenderAPI = render(
      <ModalPanelTest/>,
    );

    const { output } = shallow(component.getByType(ModalPanel));

    expect(output).toMatchSnapshot();
  });

  it('* modal panel render with props / children checking', () => {
    const component: RenderAPI = render(
      <ModalPanelTest>
        <Text>
          Test
        </Text>
      </ModalPanelTest>,
    );

    const { output } = shallow(component.getByType(ModalPanel));

    expect(output).toMatchSnapshot();
  });

  it('* modal panel l/c-hooks checks', () => {
    const componentDidMount = jest.fn();
    const componentWillUnmount = jest.fn();

    const wrapper = render(
      <ModalPanelTest
        componentDidMount={componentDidMount}
        componentWillUnmount={componentWillUnmount}
      />,
    );

    expect(componentDidMount).toHaveBeenCalled();

    wrapper.unmount();

    expect(componentWillUnmount).toHaveBeenCalled();
  });

  it('* close modal checking inner', () => {
    const component: RenderAPI = render(
      <ModalPanelTest/>,
    );

    fireEvent.press(component.getByTestId(showModalTestId));
    fireEvent.press(component.getByTestId(hideModalTestIdInner));

    const { output } = shallow(component.getByType(ModalPanel));

    expect(output).toMatchSnapshot();
  });

  it('* close modal checking outer', () => {
    const component: RenderAPI = render(
      <ModalPanelTest/>,
    );

    fireEvent.press(component.getByTestId(showModalTestId));
    fireEvent.press(component.getByTestId(hideModalTestIdOuter));

    const { output } = shallow(component.getByType(ModalPanel));

    expect(output).toMatchSnapshot();
  });

});
