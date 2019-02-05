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
import { ModalPanel } from './modalPanel.component';
import { ModalComponent } from './modal.component';

describe('@modal component/panel checks', () => {

  const MODAL_TEST_IDENTIFIER: (substring: string) => string = (substring: string): string =>
    `modal-test-identifier-${substring}`;

  interface HooksProps {
    componentDidMount?: () => void;
    componentWillUnmount?: () => void;
  }

  class ModalPanelTest extends React.Component<HooksProps> {

    componentDidMount(): void {
      this.props.componentDidMount && this.props.componentDidMount();
    }

    componentWillUnmount() {
      this.props.componentWillUnmount && this.props.componentWillUnmount();
    }

    render() {
      return (
        <ModalPanel>
          <View>
            <Text>Modal Panel Test</Text>
          </View>
        </ModalPanel>
      );
    }
  }

  it('* modal panel renders properly', () => {
    const panel = render(<ModalPanelTest/>);
    expect(panel).toMatchSnapshot();
  });

  it('* modal panel render with props / children checking', () => {
    const panelChild = <View><Text>Test</Text></View>;
    const panel = <ModalPanelTest children={panelChild}/>;
    const renderedPanel = render(panel);

    expect(panel.props.children).toBe(panelChild);
    expect(renderedPanel).toMatchSnapshot();
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

  it('* modal component renders properly', () => {
    const modal1 = render(<ModalComponent
      visible={true}
      component={<View><Text>Test1</Text></View>}
      isBackDropAllowed={false}
      identifier={MODAL_TEST_IDENTIFIER('1')}
      onCloseModal={() => 1}/>);
    const modal2 = render(<ModalComponent
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
    const modal = <ModalComponent {...modalPassingProps}/>;

    expect(modal.props.visible).toBe(modalPassingProps.visible);
    expect(modal.props.component).toBe(modalPassingProps.component);
    expect(modal.props.isBackDropAllowed).toBe(modalPassingProps.isBackDropAllowed);
  });

  it('* modal closes on passed prop', () => {
    const onCloseModal = jest.fn();
    const component = <ModalComponent
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
    const modal = render(<ModalComponent
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
