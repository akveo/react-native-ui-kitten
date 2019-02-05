import React from 'react';
import { render } from 'react-native-testing-library';
import {
  View,
  Text,
} from 'react-native';
import { ModalPanel } from './modalPanel.component';

describe('@modal panel checks', () => {

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

});
