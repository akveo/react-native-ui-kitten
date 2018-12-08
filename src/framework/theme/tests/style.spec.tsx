import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import { StyleConsumerProps, StyleProvider, withStyle } from '@rk-kit/theme';
import * as config from './config';

const styleConsumerTestId = '@style/consumer';

type TestComponentProps = any;

class Test extends React.Component<TestComponentProps & StyleConsumerProps> {
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
    const StyledComponent = withStyle(Test);

    const component = render(
      <StyleProvider mapping={mappings} theme={config.theme}>
        <StyledComponent variant='default'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.variant).not.toBeNull();
    expect(styledComponent.props.variant).not.toBeUndefined();
    expect(styledComponent.props.generated).not.toBeNull();
    expect(styledComponent.props.generated).not.toBeUndefined();
    expect(styledComponent.props.generated.style).not.toBeNull();
    expect(styledComponent.props.generated.style).not.toBeUndefined();
  });

  it('default variant styled properly', async () => {
    const StyledComponent = withStyle(Test);

    const component = render(
      <StyleProvider mapping={mappings} theme={config.theme}>
        <StyledComponent variant='default'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.generated.style.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(styledComponent.props.generated.style.textColor).toEqual(config.values.textDefault);
  });

  it('list of non-default variants styled properly', async () => {
    const StyledComponent = withStyle(Test);

    const component = render(
      <StyleProvider mapping={mappings} theme={config.theme}>
        <StyledComponent variant='dark success'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.generated.style.backgroundColor).toEqual(config.values.backgroundDark);
    expect(styledComponent.props.generated.style.textColor).toEqual(config.values.textSuccess);
  });

});
