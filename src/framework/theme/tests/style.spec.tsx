import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import { StyledComponentProps, StyleProvider, StyledComponent } from '@rk-kit/theme';
import * as config from './config';

const styleConsumerTestId = '@style/consumer';

type TestComponentProps = any;

class Test extends React.Component<TestComponentProps & StyledComponentProps> {
  static defaultProps = {
    testID: styleConsumerTestId,
  };

  render() {
    return (
      <View testID={this.props.testID}/>
    );
  }
}

describe('@style: style consumer checks', () => {

  const mappings = [config.themeMappings.test, config.themeMappings.mock];

  it('receives custom props', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <StyleProvider mapping={mappings} theme={config.theme}>
        <StyleConsumer variant='default'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.variant).not.toBeNull();
    expect(styledComponent.props.variant).not.toBeUndefined();
    expect(styledComponent.props.theme).not.toBeNull();
    expect(styledComponent.props.theme).not.toBeUndefined();
    expect(styledComponent.props.themedStyle).not.toBeUndefined();
    expect(styledComponent.props.themedStyle).not.toBeUndefined();
  });

  it('default variant styled properly', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <StyleProvider mapping={mappings} theme={config.theme}>
        <StyleConsumer variant='default'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.themedStyle.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(styledComponent.props.themedStyle.textColor).toEqual(config.values.textDefault);
  });

  it('list of non-default variants styled properly', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <StyleProvider mapping={mappings} theme={config.theme}>
        <StyleConsumer variant='dark success'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.themedStyle.backgroundColor).toEqual(config.values.backgroundDark);
    expect(styledComponent.props.themedStyle.textColor).toEqual(config.values.textSuccess);
  });

});
