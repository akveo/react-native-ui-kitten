import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import {
  DesignProvider,
  withDesign,
} from './component';

const designConsumerTestId = '@design/consumer';

class CheckBox extends React.Component<any> {
  static defaultProps = {
    testID: designConsumerTestId,
  };

  render() {
    return (
      <View testID={this.props.testID}/>
    );
  }
}

describe('@design: design consumer checks', () => {

  it('renders properly', async () => {
    const DesignedComponent = withDesign(CheckBox);

    const component = render(
      <DesignProvider>
        <DesignedComponent/>
      </DesignProvider>,
    );

    const designedComponent = component.getByTestId(designConsumerTestId);
    expect(designedComponent).not.toBeNull();
    expect(designedComponent).not.toBeUndefined();
  });

  it('receives design prop', async () => {
    const DesignedComponent = withDesign(CheckBox);

    const component = render(
      <DesignProvider>
        <DesignedComponent/>
      </DesignProvider>,
    );

    const designedComponent = component.getByTestId(designConsumerTestId);
    expect(designedComponent.props.design).not.toBeNull();
    expect(designedComponent.props.design).not.toBeUndefined();
  });

});
