import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  shallow,
} from 'react-native-testing-library';
import {
  View,
  Text,
  Button,
} from 'react-native';
import { ModalPanel } from './modalPanel.component';
import {
  ModalComponentCloseProps,
  ModalService,
} from '../../../theme';

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
        <TestModal onRequestClose={() => 1}/>, true,
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

  class TestModal extends React.Component<ModalComponentCloseProps> {

    public render(): React.ReactNode {
      return (
        <View>
          <Button
            title='Close Modal'
            onPress={this.props.onCloseModal}
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
